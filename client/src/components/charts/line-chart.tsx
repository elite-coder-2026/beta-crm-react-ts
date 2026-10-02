import { useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useElementWidth } from '../../hooks/use-element-width'
import ChartTooltip from './chart-tooltip'
import { formatCompact, niceScale, type ValueFormatter } from './chart-utils'
import { AxisText, DirectLabel, PlotArea } from './chart.styles'

export interface LineSeries {
  id: string
  label: string
  color: string
  values: number[]
}

interface LineChartProps {
  labels: string[]
  series: LineSeries[]
  ariaLabel: string
  formatValue?: ValueFormatter
  formatAxis?: ValueFormatter
  /** Total height including the x-axis band. */
  height?: number
  /** Soft area wash under the line. Defaults to on for a single series. */
  area?: boolean
}

const MARGIN = { top: 12, right: 64, bottom: 28, left: 48 }
const MIN_LABEL_GAP = 16

function LineChart({
  labels,
  series,
  ariaLabel,
  formatValue = formatCompact,
  formatAxis = formatValue,
  height = 260,
  area = series.length === 1,
}: LineChartProps) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const count = labels.length
  const plotWidth = Math.max(0, width - MARGIN.left - MARGIN.right)
  const plotHeight = height - MARGIN.top - MARGIN.bottom
  const baseline = MARGIN.top + plotHeight
  const { max, ticks } = niceScale(Math.max(0, ...series.flatMap((s) => s.values)))

  const x = (index: number) =>
    MARGIN.left + (count <= 1 ? plotWidth / 2 : (index * plotWidth) / (count - 1))
  const y = (value: number) => MARGIN.top + plotHeight * (1 - value / max)

  const labelEvery = Math.max(1, Math.ceil(count / Math.max(1, Math.floor(plotWidth / 56))))

  const endPoints = series.map((s) => ({ series: s, y: y(s.values[count - 1] ?? 0) }))
  const endLabelsCollide = endPoints.some((a, i) =>
    endPoints.some((b, j) => i < j && Math.abs(a.y - b.y) < MIN_LABEL_GAP),
  )

  const indexFromPointer = (event: PointerEvent<SVGRectElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - bounds.left) / bounds.width
    return Math.max(0, Math.min(count - 1, Math.round(ratio * (count - 1))))
  }

  const handleKeyDown = (event: KeyboardEvent<SVGRectElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const step = event.key === 'ArrowRight' ? 1 : -1
      setActiveIndex((current) =>
        Math.max(0, Math.min(count - 1, (current ?? count - 1) + step)),
      )
    }
  }

  return (
    <PlotArea ref={ref} style={{ height }}>
      {width > 0 && count > 0 && (
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

          {labels.map(
            (label, index) =>
              index % labelEvery === 0 && (
                <AxisText key={label} x={x(index)} y={baseline + 18} textAnchor="middle">
                  {label}
                </AxisText>
              ),
          )}

          {series.map((s) => {
            const points = s.values.map((value, index) => `${x(index)},${y(value)}`)
            return (
              <g key={s.id}>
                {area && (
                  <path
                    d={`M${points.join('L')}L${x(count - 1)},${baseline}L${x(0)},${baseline}Z`}
                    fill={s.color}
                    fillOpacity={0.1}
                  />
                )}
                <path
                  d={`M${points.join('L')}`}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            )
          })}

          {activeIndex !== null && (
            <line
              x1={x(activeIndex)}
              x2={x(activeIndex)}
              y1={MARGIN.top}
              y2={baseline}
              stroke="var(--chart-axis)"
              strokeWidth={1}
            />
          )}

          {endPoints.map(({ series: s, y: endY }) => (
            <g key={s.id}>
              <circle
                cx={x(activeIndex ?? count - 1)}
                cy={y(s.values[activeIndex ?? count - 1] ?? 0)}
                r={4}
                fill={s.color}
                stroke="var(--color-surface)"
                strokeWidth={2}
              />
              {!endLabelsCollide && (
                <DirectLabel x={x(count - 1) + 10} y={endY} dominantBaseline="middle">
                  {formatValue(s.values[count - 1] ?? 0)}
                </DirectLabel>
              )}
            </g>
          ))}

          <rect
            data-hit
            x={MARGIN.left}
            y={MARGIN.top}
            width={plotWidth}
            height={plotHeight}
            fill="transparent"
            tabIndex={0}
            aria-label={`${ariaLabel}. Use left and right arrow keys to read values.`}
            onPointerMove={(event) => setActiveIndex(indexFromPointer(event))}
            onPointerLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(count - 1)}
            onBlur={() => setActiveIndex(null)}
            onKeyDown={handleKeyDown}
          />
        </svg>
      )}

      {activeIndex !== null && (
        <ChartTooltip
          x={x(activeIndex)}
          y={MARGIN.top}
          containerWidth={width}
          title={labels[activeIndex]}
          items={series.map((s) => ({
            color: s.color,
            label: s.label,
            value: formatValue(s.values[activeIndex] ?? 0),
            shape: 'line',
          }))}
        />
      )}
    </PlotArea>
  )
}

export default LineChart
