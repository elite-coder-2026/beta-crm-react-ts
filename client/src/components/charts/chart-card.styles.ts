import styled from 'styled-components'

export const Card = styled.figure<{ $span?: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  margin: 0;
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  grid-column: span ${({ $span = 1 }) => $span};

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

export const Titles = styled.figcaption`
  min-width: 0;
`

export const Title = styled.h3`
  font-size: 15px;
  font-weight: 600;
`

export const Subtitle = styled.p`
  margin-top: 2px;
  font-size: 13px;
  color: var(--color-text-muted);
`

export const ViewToggle = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  padding: 2px;
  background: var(--color-neutral-bg);
  border-radius: 8px;
`

export const ViewButton = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? 'var(--color-surface)' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? 'var(--shadow)' : 'none')};
  color: ${({ $active }) => ($active ? 'var(--color-text)' : 'var(--color-text-muted)')};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-accent);
  }
`

export const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
`

export const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
`

export const LegendKey = styled.span<{ $color: string; $shape: 'line' | 'rect' }>`
  flex-shrink: 0;
  width: ${({ $shape }) => ($shape === 'line' ? '14px' : '10px')};
  height: ${({ $shape }) => ($shape === 'line' ? '2px' : '10px')};
  border-radius: ${({ $shape }) => ($shape === 'line' ? '1px' : '2px')};
  background: ${({ $color }) => $color};
`

export const TableWrap = styled.div`
  overflow-x: auto;
`

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    padding: 8px 10px;
    border-bottom: 1px solid var(--color-border-subtle);
    text-align: left;
    white-space: nowrap;
  }

  th {
    color: var(--color-text-muted);
    font-size: 12px;
    font-weight: 600;
  }

  td:not(:first-child),
  th:not(:first-child) {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  tr:last-child td {
    border-bottom: none;
  }
`

export const Empty = styled.p`
  padding: 32px 0;
  font-size: 13px;
  text-align: center;
  color: var(--color-text-muted);
`
