/** Rounds a max value up to a clean axis maximum and returns evenly spaced ticks. */
export const niceScale = (maxValue: number, tickCount = 4) => {
  if (maxValue <= 0) return { max: 1, ticks: [0, 1] }

  const rawStep = maxValue / tickCount
  const magnitude = 10 ** Math.floor(Math.log10(rawStep))
  const normalized = rawStep / magnitude
  const niceStep = (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude
  const max = Math.ceil(maxValue / niceStep) * niceStep
  const ticks = Array.from({ length: Math.round(max / niceStep) + 1 }, (_, i) => i * niceStep)

  return { max, ticks }
}

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const whole = new Intl.NumberFormat('en-US')

/** 1,284 · 12.9K · 4.2M */
export const formatCompact = (value: number) =>
  Math.abs(value) < 10_000 ? whole.format(Math.round(value)) : compact.format(value)

/** $1,284 · $12.9K · $4.2M */
export const formatCurrency = (value: number) =>
  `${value < 0 ? '-' : ''}$${formatCompact(Math.abs(value))}`

export const formatPercent = (value: number, fractionDigits = 0) =>
  `${(value * 100).toFixed(fractionDigits)}%`

export type ValueFormatter = (value: number) => string
