import { useState } from 'react'
import { useElementWidth } from '../../hooks/use-element-width'
import ChartTooltip from './chart-tooltip'
import { formatCompact, niceScale, type ValueFormatter } from './chart-utils'
import { AxisText, DirectLabel, PlotArea } from './chart.styles'

export interface BarDatum {
  label: string
  value: number
  /** Per-bar color, e.g. an ordinal ramp. Defaults to the chart color. */
  color?: string
  /** Extra line shown in the tooltip. */
  detail?: string
}

interface BarChartProps {
  data: BarDatum[]
  ariaLabel: string
  seriesLabel?: string
  color?: string
  formatValue?: ValueFormatter
  formatAxis?: ValueFormatter
  /** Total height including the x-axis band. */
  height?: number
  showValues?: boolean
}

const MARGIN = { top: 24, right: 8, bottom: 28, left: 48 }
const MAX_BAR_WIDTH = 24
const RADIUS = 4

/** Rounded data-end, square at the baseline. */
const columnPath = (x: number, top: number, width: number, baseline: number) => {
  const r = Math.min(RADIUS, width / 2, baseline - top)
  const right = x + width
  return `M${x},${baseline}V${top + r}Q${x},${top} ${x + r},${top}H${right - r}Q${right},${top} ${right},${top + r}V${baseline}Z`
}

function BarChart({
  data,
  ariaLabel,
  seriesLabel = 'Value',
  color = 'var(--chart-1)',
  formatValue = formatCompact,
  formatAxis = formatValue,
  height = 260,
  showValues = true,
}: BarChartProps) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const plotWidth = Math.max(0, width - MARGIN.left - MARGIN.right)
  const plotHeight = height - MARGIN.top - MARGIN.bottom
  const baseline = MARGIN.top + plotHeight
  const { max, ticks } = niceScale(Math.max(0, ...data.map((d) => d.value)))

  const band = data.length > 0 ? plotWidth / data.length : 0
  const barWidth = Math.min(MAX_BAR_WIDTH, band * 0.6)
  const y = (value: number) => MARGIN.top + plotHeight * (1 - value / max)
  const labelEvery = Math.max(1, Math.ceil(56 / Math.max(1, band)))

  const active = activeIndex !== null ? data[activeIndex] : null

  return (
    <PlotArea ref={ref} style={{ height }} onPointerLeave={() => setActiveIndex(null)}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={ariaLabel}>
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={MARGIN.left}
                x2={MARGIN.left + plotWidth}
                y1={y(tick)}
                y2={y(tick)}
                stroke={tick === 0 ? 'var(--chart-axis)' : 'var(--chart-grid)'}
                strokeWidth={1}
              />
              <AxisText x={MARGIN.left - 8} y={y(tick)} textAnchor="end" dominantBaseline="middle">
                {formatAxis(tick)}
              </AxisText>
            </g>
          ))}

          {data.map((datum, index) => {
            const bandX = MARGIN.left + index * band
            const barX = bandX + (band - barWidth) / 2
            const top = y(datum.value)
            const isActive = index === activeIndex

            return (
              <g key={datum.label}>
                {datum.value > 0 && (
                  <path
                    d={columnPath(barX, top, barWidth, baseline)}
                    fill={datum.color ?? color}
                    opacity={activeIndex === null || isActive ? 1 : 0.55}
                  />
                )}
                {showValues && (
                  <DirectLabel x={barX + barWidth / 2} y={top - 6} textAnchor="middle">
                    {formatValue(datum.value)}
                  </DirectLabel>
                )}
                {index % labelEvery === 0 && (
                  <AxisText x={bandX + band / 2} y={baseline + 18} textAnchor="middle">
                    {datum.label}
                  </AxisText>
                )}
                <rect
                  data-hit
                  x={bandX}
                  y={MARGIN.top}
                  width={band}
                  height={plotHeight}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`${datum.label}: ${formatValue(datum.value)}`}
                  onPointerEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                />
              </g>
            )
          })}
        </svg>
      )}

      {active && activeIndex !== null && (
        <ChartTooltip
          x={MARGIN.left + activeIndex * band + band / 2 + barWidth / 2}
          y={Math.max(0, y(active.value) - 8)}
          containerWidth={width}
          title={active.label}
          items={[
            { color: active.color ?? color, label: seriesLabel, value: formatValue(active.value) },
          ]}
          note={active.detail}
        />
      )}
    </PlotArea>
  )
}

export default BarChart
