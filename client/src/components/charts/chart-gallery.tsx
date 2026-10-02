import ChartCard from './chart-card'
import LineChart from './line-chart'
import BarChart from './bar-chart'
import HorizontalBarChart from './horizontal-bar-chart'
import StackedBarChart from './stacked-bar-chart'
import StatTile from './stat-tile'
import { KpiRow } from './stat-tile.styles'
import { formatCurrency } from './chart-utils'

export type ChartGalleryItem =
  | 'stat-tile'
  | 'line-chart'
  | 'bar-chart'
  | 'horizontal-bar-chart'
  | 'stacked-bar-chart'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const signups = [120, 138, 131, 162, 178, 171, 196, 214, 238]
const trials = [64, 70, 77, 81, 95, 92, 104, 118, 126]

const weekdays = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 57 },
  { label: 'Wed', value: 61 },
  { label: 'Thu', value: 48 },
  { label: 'Fri', value: 35 },
]

const channels = [
  { label: 'Email', value: 1840 },
  { label: 'Phone', value: 1210 },
  { label: 'Live chat', value: 860 },
  { label: 'Social', value: 320 },
]

const ticketSeries = [
  { id: 'solved', label: 'Solved', color: 'var(--chart-1)' },
  { id: 'pending', label: 'Pending', color: 'var(--chart-2)' },
  { id: 'escalated', label: 'Escalated', color: 'var(--chart-3)' },
]

const ticketRows = [
  { label: 'Ava Thompson', values: { solved: 48, pending: 9, escalated: 3 } },
  { label: 'Liam Carter', values: { solved: 36, pending: 14, escalated: 2 } },
  { label: 'Noah Patel', values: { solved: 29, pending: 6, escalated: 7 } },
]

interface ChartGalleryProps {
  chart: ChartGalleryItem
}

/** Sample data for each chart component on its own. */
function ChartGallery({ chart }: ChartGalleryProps) {
  switch (chart) {
    case 'stat-tile':
      return (
        <KpiRow>
          <StatTile
            label="Monthly revenue"
            value={formatCurrency(48_200)}
            delta={{ value: 0.124, period: 'vs last month' }}
            trend={[31, 34, 33, 38, 41, 39, 44, 46, 48.2]}
          />
          <StatTile
            label="Churn rate"
            value="2.1%"
            delta={{ value: -0.004, kind: 'points', period: 'vs last month', upIsGood: false }}
          />
          <StatTile label="Active customers" value="1,284" />
        </KpiRow>
      )

    case 'line-chart':
      return (
        <ChartCard
          title="Sign-ups and trials"
          subtitle="Per month, this year"
          legend={[
            { label: 'Sign-ups', color: 'var(--chart-1)', shape: 'line' },
            { label: 'Trials started', color: 'var(--chart-2)', shape: 'line' },
          ]}
          table={{
            columns: ['Month', 'Sign-ups', 'Trials started'],
            rows: months.map((month, i) => [month, signups[i], trials[i]]),
          }}
        >
          <LineChart
            ariaLabel="Sign-ups and trials per month"
            labels={months}
            series={[
              { id: 'signups', label: 'Sign-ups', color: 'var(--chart-1)', values: signups },
              { id: 'trials', label: 'Trials started', color: 'var(--chart-2)', values: trials },
            ]}
          />
        </ChartCard>
      )

    case 'bar-chart':
      return (
        <ChartCard
          title="Meetings booked"
          subtitle="By day of the week"
          table={{ columns: ['Day', 'Meetings'], rows: weekdays.map((d) => [d.label, d.value]) }}
        >
          <BarChart ariaLabel="Meetings booked by day" seriesLabel="Meetings" data={weekdays} />
        </ChartCard>
      )

    case 'horizontal-bar-chart':
      return (
        <ChartCard
          title="Support conversations"
          subtitle="By channel, last 30 days"
          table={{ columns: ['Channel', 'Conversations'], rows: channels.map((c) => [c.label, c.value]) }}
        >
          <HorizontalBarChart
            ariaLabel="Support conversations by channel"
            seriesLabel="Conversations"
            data={channels}
          />
        </ChartCard>
      )

    case 'stacked-bar-chart':
      return (
        <ChartCard
          title="Tickets by agent"
          subtitle="This week"
          legend={ticketSeries}
          table={{
            columns: ['Agent', 'Solved', 'Pending', 'Escalated'],
            rows: ticketRows.map((r) => [r.label, r.values.solved, r.values.pending, r.values.escalated]),
          }}
        >
          <StackedBarChart ariaLabel="Tickets by agent" series={ticketSeries} rows={ticketRows} />
        </ChartCard>
      )
  }
}

export default ChartGallery
