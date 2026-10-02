import styled from 'styled-components'

export const TableContainer = styled.div`
  overflow-x: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`

export const Th = styled.th`
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
`

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-subtle);
  white-space: nowrap;

  tr:last-child > & {
    border-bottom: none;
  }
`

export const CheckboxCell = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
`

export const RowActions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button<{ $variant?: 'default' | 'danger' }>`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: ${({ $variant }) => ($variant === 'danger' ? 'var(--color-danger)' : 'var(--color-text-muted)')};
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'danger' ? 'var(--color-danger-bg)' : 'var(--color-hover)'};
    border-color: ${({ $variant }) =>
      $variant === 'danger' ? 'var(--color-danger)' : 'var(--color-border)'};
    color: ${({ $variant }) => ($variant === 'danger' ? 'var(--color-danger)' : 'var(--color-text)')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`
