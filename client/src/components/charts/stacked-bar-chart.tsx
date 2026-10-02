import { useRef, useState, type FocusEvent } from 'react'
import ChartTooltip from './chart-tooltip'
import { formatCompact, formatPercent, type ValueFormatter } from './chart-utils'
import { Row, RowLabel, Rows, Segment, Stack, StackArea, Total } from './stacked-bar-chart.styles'

export interface StackSeries {
  id: string
  label: string
  color: string
}

export interface StackRow {
  label: string
  values: Record<string, number>
}

interface StackedBarChartProps {
  series: StackSeries[]
  rows: StackRow[]
  ariaLabel: string
  formatValue?: ValueFormatter
}

interface ActiveRow {
  index: number
  x: number
  y: number
  containerWidth: number
}

const rowTotal = (row: StackRow, series: StackSeries[]) =>
  series.reduce((sum, s) => sum + (row.values[s.id] ?? 0), 0)

function StackedBarChart({
  series,
  rows,
  ariaLabel,
  formatValue = formatCompact,
}: StackedBarChartProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<ActiveRow | null>(null)
  const maxTotal = Math.max(0, ...rows.map((row) => rowTotal(row, series)))

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

  const activeRow = active ? rows[active.index] : null
  const activeTotal = activeRow ? rowTotal(activeRow, series) : 0

  return (
    <Rows ref={rootRef} role="list" aria-label={ariaLabel} onPointerLeave={() => setActive(null)}>
      {rows.map((row, index) => {
        const total = rowTotal(row, series)
        const percent = maxTotal === 0 ? 0 : (total / maxTotal) * 100
        const description = series
          .map((s) => `${s.label} ${formatValue(row.values[s.id] ?? 0)}`)
          .join(', ')

        return (
          <Row
            key={row.label}
            role="listitem"
            tabIndex={0}
            aria-label={`${row.label}: ${description}`}
            $dimmed={active !== null && active.index !== index}
            onPointerMove={(event) => activate(index, event.clientX, event.clientY)}
            onFocus={(event) => activateFromFocus(index, event)}
            onBlur={() => setActive(null)}
          >
            <RowLabel title={row.label}>{row.label}</RowLabel>
            <StackArea>
              {total > 0 && (
                <Stack style={{ width: `${percent}%` }}>
                  {series.map((s) => {
                    const value = row.values[s.id] ?? 0
                    return value > 0 ? (
                      <Segment key={s.id} style={{ flexGrow: value, background: s.color }} />
                    ) : null
                  })}
                </Stack>
              )}
              <Total style={{ left: `calc(${percent}% + 8px)` }}>{formatValue(total)}</Total>
            </StackArea>
          </Row>
        )
      })}

      {active && activeRow && (
        <ChartTooltip
          x={active.x}
          y={active.y + 12}
          containerWidth={active.containerWidth}
          title={activeRow.label}
          items={series.map((s) => {
            const value = activeRow.values[s.id] ?? 0
            return {
              color: s.color,
              label: s.label,
              value:
                activeTotal > 0
                  ? `${formatValue(value)} · ${formatPercent(value / activeTotal)}`
                  : formatValue(value),
            }
          })}
          note={`Total ${formatValue(activeTotal)}`}
        />
      )}
    </Rows>
  )
}

export default StackedBarChart
