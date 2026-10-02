import {
  TooltipBox,
  TooltipKey,
  TooltipLabel,
  TooltipNote,
  TooltipRow,
  TooltipTitle,
  TooltipValue,
} from './chart.styles'

export interface TooltipItem {
  color: string
  label: string
  value: string
  shape?: 'line' | 'rect'
}

interface ChartTooltipProps {
  /** Anchor point inside the plot area, in px. */
  x: number
  y: number
  /** Plot width, used to flip the tooltip so it never leaves the chart. */
  containerWidth: number
  title?: string
  items: TooltipItem[]
  /** An extra line under the values, e.g. a share or conversion rate. */
  note?: string
}

const OFFSET = 12
const ESTIMATED_WIDTH = 180

function ChartTooltip({ x, y, containerWidth, title, items, note }: ChartTooltipProps) {
  const flip = x + OFFSET + ESTIMATED_WIDTH > containerWidth
  const style = flip
    ? { right: containerWidth - x + OFFSET, top: y }
    : { left: x + OFFSET, top: y }

  return (
    <TooltipBox style={style} role="status">
      {title && <TooltipTitle>{title}</TooltipTitle>}
      {items.map((item) => (
        <TooltipRow key={item.label}>
          <TooltipKey $color={item.color} $shape={item.shape ?? 'rect'} />
          <TooltipValue>{item.value}</TooltipValue>
          <TooltipLabel>{item.label}</TooltipLabel>
        </TooltipRow>
      ))}
      {note && <TooltipNote>{note}</TooltipNote>}
    </TooltipBox>
  )
}

export default ChartTooltip
