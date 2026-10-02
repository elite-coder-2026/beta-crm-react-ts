import { useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import ChartTooltip from './chart-tooltip'
import { formatCompact, type ValueFormatter } from './chart-utils'
import type { BarDatum } from './bar-chart'
import { Fill, FillArea, Row, RowLabel, Rows, Value } from './horizontal-bar-chart.styles'

interface HorizontalBarChartProps {
  data: BarDatum[]
  ariaLabel: string
  seriesLabel?: string
  color?: string
  formatValue?: ValueFormatter
}

interface ActiveRow {
  index: number
  x: number
  y: number
  containerWidth: number
}

function HorizontalBarChart({
  data,
  ariaLabel,
  seriesLabel = 'Value',
  color = 'var(--chart-1)',
  formatValue = formatCompact,
}: HorizontalBarChartProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<ActiveRow | null>(null)
  const max = Math.max(0, ...data.map((d) => d.value))

  const activate = (index: number, clientX: number, clientY: number) => {
    const bounds = rootRef.current?.getBoundingClientRect()
    if (!bounds) return
    setActive({
      index,
      x: clientX - bounds.left,
      y: clientY - bounds.top,
      containerWidth: bounds.width,
    })
  }

  const activateFromFocus = (index: number, event: FocusEvent<HTMLDivElement>) => {
    const row = event.currentTarget.getBoundingClientRect()
    activate(index, row.left + row.width / 2, row.top)
  }

  const activeDatum = active ? data[active.index] : null

  return (
    <Rows
      ref={rootRef}
      role="list"
      aria-label={ariaLabel}
      onPointerLeave={() => setActive(null)}
    >
      {data.map((datum, index) => {
        const percent = max === 0 ? 0 : (datum.value / max) * 100

        return (
          <Row
            key={datum.label}
            role="listitem"
            tabIndex={0}
            aria-label={`${datum.label}: ${formatValue(datum.value)}`}
            $dimmed={active !== null && active.index !== index}
            onPointerMove={(event: PointerEvent<HTMLDivElement>) =>
              activate(index, event.clientX, event.clientY)
            }
            onFocus={(event) => activateFromFocus(index, event)}
            onBlur={() => setActive(null)}
          >
            <RowLabel title={datum.label}>{datum.label}</RowLabel>
            <FillArea>
              {datum.value > 0 && (
                <Fill style={{ width: `${percent}%`, background: datum.color ?? color }} />
              )}
              <Value style={{ left: `calc(${percent}% + 8px)` }}>{formatValue(datum.value)}</Value>
            </FillArea>
          </Row>
        )
      })}

      {active && activeDatum && (
        <ChartTooltip
          x={active.x}
          y={active.y + 12}
          containerWidth={active.containerWidth}
          title={activeDatum.label}
          items={[
            {
              color: activeDatum.color ?? color,
              label: seriesLabel,
              value: formatValue(activeDatum.value),
            },
          ]}
          note={activeDatum.detail}
        />
      )}
    </Rows>
  )
}

export default HorizontalBarChart
