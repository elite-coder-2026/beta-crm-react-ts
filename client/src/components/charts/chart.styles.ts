import styled from 'styled-components'

/** Positioning context for a plot and its tooltip. */
export const PlotArea = styled.div`
  position: relative;
  width: 100%;

  & svg {
    display: block;
    overflow: visible;
  }

  & [data-hit]:focus-visible {
    outline: none;
  }
`

export const AxisText = styled.text`
  fill: var(--color-text-muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
`

export const DirectLabel = styled.text`
  fill: var(--color-text);
  font-size: 12px;
  font-weight: 600;
`

export const TooltipBox = styled.div`
  position: absolute;
  z-index: 10;
  min-width: 140px;
  padding: 8px 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  pointer-events: none;
  white-space: nowrap;
`

export const TooltipTitle = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--color-text-muted);
`

export const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & + & {
    margin-top: 2px;
  }
`

export const TooltipKey = styled.span<{ $color: string; $shape: 'line' | 'rect' }>`
  flex-shrink: 0;
  width: ${({ $shape }) => ($shape === 'line' ? '12px' : '10px')};
  height: ${({ $shape }) => ($shape === 'line' ? '2px' : '10px')};
  border-radius: ${({ $shape }) => ($shape === 'line' ? '1px' : '2px')};
  background: ${({ $color }) => $color};
`

export const TooltipValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`

export const TooltipLabel = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

export const TooltipNote = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: var(--color-text-muted);
`
