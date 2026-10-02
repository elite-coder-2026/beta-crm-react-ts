import { dealSources, funnelStages, type Deal, type DealSource } from './deal-types'

export type DateRangeId = '3m' | '6m' | '12m' | 'ytd'

export const dateRanges: { id: DateRangeId; label: string }[] = [
  { id: '3m', label: 'Last 3 months' },
  { id: '6m', label: 'Last 6 months' },
  { id: '12m', label: 'Last 12 months' },
  { id: 'ytd', label: 'Year to date' },
]

export interface MonthBucket {
  label: string
  longLabel: string
  start: Date
  end: Date
}

const monthCount = (rangeId: DateRangeId, now: Date) =>
  rangeId === 'ytd' ? now.getMonth() + 1 : Number.parseInt(rangeId, 10)

const buildMonths = (count: number, offset: number, now: Date): MonthBucket[] =>
  Array.from({ length: count }, (_, i) => {
    const start = new Date(now.getFullYear(), now.getMonth() - offset - (count - 1 - i), 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
    return {
      label: start.toLocaleDateString('en-US', { month: 'short' }),
      longLabel: start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      start,
      end,
    }
  })

const within = (date: Date | null, months: MonthBucket[]) =>
  date !== null && date >= months[0].start && date < months[months.length - 1].end

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

/** How far through the funnel a deal got, as an index into funnelStages. */
export const funnelReach = (deal: Deal) =>
  deal.stage === 'lost'
    ? (deal.lostAtStage ?? 0)
    : funnelStages.findIndex((stage) => stage.id === deal.stage)

const isOpen = (deal: Deal) => deal.stage !== 'won' && deal.stage !== 'lost'

function periodTotals(deals: Deal[], months: MonthBucket[]) {
  const won = deals.filter((d) => d.stage === 'won' && within(d.closedAt, months))
  const lost = deals.filter((d) => d.stage === 'lost' && within(d.closedAt, months))
  const revenue = sum(won.map((d) => d.value))
  const closed = won.length + lost.length

  return {
    revenue,
    dealsWon: won.length,
    winRate: closed === 0 ? 0 : won.length / closed,
    avgDeal: won.length === 0 ? 0 : revenue / won.length,
  }
}

/** Relative change, or null when there is nothing to compare against. */
export const relativeChange = (current: number, previous: number) =>
  previous === 0 ? null : (current - previous) / previous

export function computeSalesMetrics(
  allDeals: Deal[],
  rangeId: DateRangeId,
  ownerId: number | null,
  now = new Date(),
) {
  const deals = ownerId === null ? allDeals : allDeals.filter((d) => d.ownerId === ownerId)
  const count = monthCount(rangeId, now)
  const months = buildMonths(count, 0, now)
  const previousMonths = buildMonths(count, count, now)

  const current = periodTotals(deals, months)
  const previous = periodTotals(deals, previousMonths)

  const revenueByMonth = months.map((month) =>
    sum(deals.filter((d) => d.stage === 'won' && within(d.closedAt, [month])).map((d) => d.value)),
  )
  const wonByMonth = months.map(
    (month) => deals.filter((d) => d.stage === 'won' && within(d.closedAt, [month])).length,
  )
  const pipelineByMonth = months.map((month) =>
    sum(deals.filter((d) => within(d.createdAt, [month])).map((d) => d.value)),
  )

  const created = deals.filter((d) => within(d.createdAt, months))
  const openDeals = deals.filter(isOpen)

  const funnel = funnelStages.map((stage, index) => ({
    ...stage,
    count: created.filter((d) => funnelReach(d) >= index).length,
  }))

  const sources = dealSources
    .map((source: DealSource) => {
      const fromSource = created.filter((d) => d.source === source)
      return { source, count: fromSource.length, value: sum(fromSource.map((d) => d.value)) }
    })
    .sort((a, b) => b.count - a.count)

  const ownerIds = [...new Set(allDeals.map((d) => d.ownerId))].filter(
    (id) => ownerId === null || id === ownerId,
  )
  const reps = ownerIds
    .map((id) => {
      const repDeals = deals.filter((d) => d.ownerId === id)
      const totals = periodTotals(repDeals, months)
      const repCreated = created.filter((d) => d.ownerId === id)
      return {
        ownerId: id,
        revenue: totals.revenue,
        winRate: totals.winRate,
        won: repCreated.filter((d) => d.stage === 'won').length,
        lost: repCreated.filter((d) => d.stage === 'lost').length,
        open: repCreated.filter(isOpen).length,
      }
    })
    .sort((a, b) => b.revenue - a.revenue)

  const topDeals = deals
    .filter((d) => d.stage === 'won' && within(d.closedAt, months))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  return {
    months,
    current,
    previous,
    openPipeline: sum(openDeals.map((d) => d.value)),
    openDealCount: openDeals.length,
    revenueByMonth,
    wonByMonth,
    pipelineByMonth,
    funnel,
    sources,
    totalLeads: created.length,
    reps,
    topDeals,
  }
}

export type SalesMetrics = ReturnType<typeof computeSalesMetrics>
