import { useElementWidth } from '../../hooks/use-element-width'
import { formatPercent } from './chart-utils'
import { Delta, DeltaPeriod, Label, Sparkline, Tile, Value } from './stat-tile.styles'

interface StatDelta {
  /** Relative change (0.12 = +12%), or for kind 'points' a difference of rates (0.032 = +3.2 pts). */
  value: number
  kind?: 'relative' | 'points'
  period: string
  /** Whether an increase is good news. Defaults to true. */
  upIsGood?: boolean
}

interface StatTileProps {
  label: string
  value: string
  delta?: StatDelta | null
  trend?: number[]
}

const SPARK_HEIGHT = 32

function TrendLine({ values }: { values: number[] }) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const x = (i: number) => (values.length <= 1 ? width / 2 : (i * width) / (values.length - 1))
  const y = (v: number) => SPARK_HEIGHT - 3 - ((v - min) / range) * (SPARK_HEIGHT - 6)
  const last = values.length - 1

  return (
    <Sparkline ref={ref} aria-hidden="true">
      {width > 0 && (
        <svg width={width} height={SPARK_HEIGHT}>
          <polyline
            points={values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
            fill="none"
            stroke="var(--chart-muted)"
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle
            cx={x(last)}
            cy={y(values[last])}
            r={3.5}
            fill="var(--chart-1)"
            stroke="var(--color-surface)"
            strokeWidth={2}
          />
        </svg>
      )}
    </Sparkline>
  )
}

function StatTile({ label, value, delta, trend }: StatTileProps) {
  const direction = delta ? Math.sign(Math.round(delta.value * 1000)) : 0
  const upIsGood = delta?.upIsGood ?? true
  const tone = direction === 0 ? 'neutral' : direction > 0 === upIsGood ? 'good' : 'bad'

  return (
    <Tile>
      <Label>{label}</Label>
      <Value>{value}</Value>
      {delta && (
        <Delta $tone={tone}>
          <span aria-hidden="true">{direction > 0 ? '▲' : direction < 0 ? '▼' : '–'}</span>
          {direction > 0 ? '+' : ''}
          {delta.kind === 'points'
            ? `${(delta.value * 100).toFixed(1)} pts`
            : formatPercent(delta.value, 1)}
          <DeltaPeriod>{delta.period}</DeltaPeriod>
        </Delta>
      )}
      {trend && trend.length > 1 && <TrendLine values={trend} />}
    </Tile>
  )
}

export default StatTile
