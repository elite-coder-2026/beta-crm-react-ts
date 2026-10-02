import { useMemo, useState } from 'react'
import type { Member } from '../members-list'
import type { Deal } from './deal-types'
import {
  computeSalesMetrics,
  dateRanges,
  relativeChange,
  type DateRangeId,
} from './sales-metrics'
import ChartCard from '../charts/chart-card'
import LineChart from '../charts/line-chart'
import HorizontalBarChart from '../charts/horizontal-bar-chart'
import StackedBarChart from '../charts/stacked-bar-chart'
import StatTile from '../charts/stat-tile'
import { KpiRow } from '../charts/stat-tile.styles'
import { formatCompact, formatCurrency, formatPercent } from '../charts/chart-utils'
import SortableTable from '../sortable-table'
import type { TableColumn } from '../table-types'
import {
  ChartGrid,
  FilterRow,
  FilterSelect,
  RangeButton,
  RangeGroup,
  Report,
  ReportHeader,
  ReportSubtitle,
  ReportTitle,
  SectionTitle,
} from './report.styles'

interface SalesReportProps {
  deals: Deal[]
  members: Member[]
}

const ALL = 'all'
const funnelColors = [
  'var(--chart-ramp-1)',
  'var(--chart-ramp-2)',
  'var(--chart-ramp-3)',
  'var(--chart-ramp-4)',
  'var(--chart-ramp-5)',
]
const outcomeSeries = [
  { id: 'won', label: 'Won', color: 'var(--chart-1)' },
  { id: 'lost', label: 'Lost', color: 'var(--chart-2)' },
  { id: 'open', label: 'Open', color: 'var(--chart-3)' },
]

const formatDate = (date: Date | null) =>
  date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

interface TopDealRow {
  id: number
  company: string
  owner: string
  source: string
  value: number
  closedAt: number
}

function SalesReport({ deals, members }: SalesReportProps) {
  const [rangeId, setRangeId] = useState<DateRangeId>('6m')
  const [ownerFilter, setOwnerFilter] = useState<string>(ALL)

  const ownerId = ownerFilter === ALL ? null : Number(ownerFilter)
  const metrics = useMemo(
    () => computeSalesMetrics(deals, rangeId, ownerId),
    [deals, rangeId, ownerId],
  )

  const memberName = (id: number) => members.find((m) => m.id === id)?.name ?? `Rep #${id}`
  const rangeLabel = dateRanges.find((r) => r.id === rangeId)?.label ?? ''
  const period = 'vs previous period'
  const { current, previous, months } = metrics
  const monthLabels = months.map((m) => m.label)
  const leadsTotal = metrics.totalLeads

  const funnelData = metrics.funnel.map((stage, index) => {
    const previousCount = index === 0 ? stage.count : metrics.funnel[index - 1].count
    return {
      label: stage.label,
      value: stage.count,
      color: funnelColors[index],
      detail:
        index === 0
          ? 'All new deals in this period'
          : `${formatPercent(previousCount === 0 ? 0 : stage.count / previousCount)} of ${metrics.funnel[index - 1].label.toLowerCase()} · ${formatPercent(leadsTotal === 0 ? 0 : stage.count / leadsTotal)} of leads`,
    }
  })

  const sourceData = metrics.sources.map((s) => ({
    label: s.source,
    value: s.count,
    detail: `${formatPercent(leadsTotal === 0 ? 0 : s.count / leadsTotal)} of leads · ${formatCurrency(s.value)} pipeline`,
  }))

  const repRevenueData = metrics.reps.map((rep) => ({
    label: memberName(rep.ownerId),
    value: rep.revenue,
    detail: `Win rate ${formatPercent(rep.winRate)}`,
  }))

  const topDealRows: TopDealRow[] = metrics.topDeals.map((deal) => ({
    id: deal.id,
    company: deal.company,
    owner: memberName(deal.ownerId),
    source: deal.source,
    value: deal.value,
    closedAt: deal.closedAt?.getTime() ?? 0,
  }))

  const topDealColumns: TableColumn<TopDealRow>[] = [
    { key: 'company', header: 'Company' },
    { key: 'owner', header: 'Owner' },
    { key: 'source', header: 'Source' },
    { key: 'value', header: 'Value', render: (row) => formatCurrency(row.value) },
    { key: 'closedAt', header: 'Closed', render: (row) => formatDate(new Date(row.closedAt)) },
  ]

  return (
    <Report>
      <ReportHeader>
        <ReportTitle>Sales report</ReportTitle>
        <ReportSubtitle>
          {months[0].longLabel} – {months[months.length - 1].longLabel}
          {ownerId !== null && ` · ${memberName(ownerId)}`}
        </ReportSubtitle>
      </ReportHeader>

      <FilterRow>
        <RangeGroup role="group" aria-label="Date range">
          {dateRanges.map((range) => (
            <RangeButton
              key={range.id}
              type="button"
              $active={range.id === rangeId}
              aria-pressed={range.id === rangeId}
              onClick={() => setRangeId(range.id)}
            >
              {range.label}
            </RangeButton>
          ))}
        </RangeGroup>
        <FilterSelect
          aria-label="Filter by owner"
          value={ownerFilter}
          onChange={(event) => setOwnerFilter(event.target.value)}
        >
          <option value={ALL}>All owners</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </FilterSelect>
      </FilterRow>

      <KpiRow>
        <StatTile
          label="Revenue won"
          value={formatCurrency(current.revenue)}
          delta={nullableDelta(relativeChange(current.revenue, previous.revenue), period)}
          trend={metrics.revenueByMonth}
        />
        <StatTile
          label="Deals won"
          value={formatCompact(current.dealsWon)}
          delta={nullableDelta(relativeChange(current.dealsWon, previous.dealsWon), period)}
          trend={metrics.wonByMonth}
        />
        <StatTile
          label="Win rate"
          value={formatPercent(current.winRate)}
          delta={{ value: current.winRate - previous.winRate, kind: 'points', period }}
        />
        <StatTile
          label="Average deal size"
          value={formatCurrency(current.avgDeal)}
          delta={nullableDelta(relativeChange(current.avgDeal, previous.avgDeal), period)}
        />
        <StatTile
          label="Open pipeline"
          value={formatCurrency(metrics.openPipeline)}
          delta={null}
        />
      </KpiRow>

      <ChartGrid>
        <ChartCard
          span={2}
          title="Revenue over time"
          subtitle={`Won revenue and new pipeline per month · ${rangeLabel.toLowerCase()}`}
          legend={[
            { label: 'Won revenue', color: 'var(--chart-1)', shape: 'line' },
            { label: 'New pipeline', color: 'var(--chart-2)', shape: 'line' },
          ]}
          table={{
            columns: ['Month', 'Won revenue', 'New pipeline'],
            rows: months.map((month, i) => [
              month.longLabel,
              formatCurrency(metrics.revenueByMonth[i]),
              formatCurrency(metrics.pipelineByMonth[i]),
            ]),
          }}
        >
          <LineChart
            ariaLabel="Won revenue and new pipeline per month"
            labels={monthLabels}
            series={[
              { id: 'won', label: 'Won revenue', color: 'var(--chart-1)', values: metrics.revenueByMonth },
              { id: 'pipeline', label: 'New pipeline', color: 'var(--chart-2)', values: metrics.pipelineByMonth },
            ]}
            formatValue={formatCurrency}
          />
        </ChartCard>

        <ChartCard
          title="Deal funnel"
          subtitle="Deals created in this period, by furthest stage reached"
          isEmpty={leadsTotal === 0}
          table={{
            columns: ['Stage', 'Deals', 'Of previous stage', 'Of leads'],
            rows: metrics.funnel.map((stage, i) => {
              const prev = i === 0 ? stage.count : metrics.funnel[i - 1].count
              return [
                stage.label,
                stage.count,
                formatPercent(prev === 0 ? 0 : stage.count / prev),
                formatPercent(leadsTotal === 0 ? 0 : stage.count / leadsTotal),
              ]
            }),
          }}
        >
          <HorizontalBarChart
            ariaLabel="Deal funnel by stage"
            seriesLabel="Deals"
            data={funnelData}
          />
        </ChartCard>

        <ChartCard
          title="Leads by source"
          subtitle="Where this period's new deals came from"
          isEmpty={leadsTotal === 0}
          table={{
            columns: ['Source', 'Leads', 'Share', 'Pipeline'],
            rows: metrics.sources.map((s) => [
              s.source,
              s.count,
              formatPercent(leadsTotal === 0 ? 0 : s.count / leadsTotal),
              formatCurrency(s.value),
            ]),
          }}
        >
          <HorizontalBarChart ariaLabel="Leads by source" seriesLabel="Leads" data={sourceData} />
        </ChartCard>

        <ChartCard
          title="Revenue by rep"
          subtitle="Won revenue closed in this period"
          isEmpty={metrics.reps.length === 0}
          table={{
            columns: ['Rep', 'Revenue', 'Win rate'],
            rows: metrics.reps.map((rep) => [
              memberName(rep.ownerId),
              formatCurrency(rep.revenue),
              formatPercent(rep.winRate),
            ]),
          }}
        >
          <HorizontalBarChart
            ariaLabel="Won revenue by rep"
            seriesLabel="Revenue"
            data={repRevenueData}
            formatValue={formatCurrency}
          />
        </ChartCard>

        <ChartCard
          title="Deal outcomes by rep"
          subtitle="Deals created in this period"
          isEmpty={metrics.reps.length === 0}
          legend={outcomeSeries}
          table={{
            columns: ['Rep', 'Won', 'Lost', 'Open'],
            rows: metrics.reps.map((rep) => [memberName(rep.ownerId), rep.won, rep.lost, rep.open]),
          }}
        >
          <StackedBarChart
            ariaLabel="Deal outcomes by rep"
            series={outcomeSeries}
            rows={metrics.reps.map((rep) => ({
              label: memberName(rep.ownerId),
              values: { won: rep.won, lost: rep.lost, open: rep.open },
            }))}
          />
        </ChartCard>
      </ChartGrid>

      <section>
        <SectionTitle>Top won deals</SectionTitle>
        <SortableTable columns={topDealColumns} rows={topDealRows} />
      </section>
    </Report>
  )
}

const nullableDelta = (value: number | null, period: string) =>
  value === null ? null : { value, period }

export default SalesReport
