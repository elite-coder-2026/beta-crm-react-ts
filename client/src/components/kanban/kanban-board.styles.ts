import styled from 'styled-components'

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`

export const BoardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px;
`

export const BoardTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const BoardSummary = styled.span`
  font-size: 14px;
  color: var(--color-text-muted);
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`

export const SearchField = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 220px;
  max-width: 320px;
  color: var(--color-text-muted);

  & > svg {
    position: absolute;
    left: 10px;
    pointer-events: none;
  }
`

const controlStyles = `
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const SearchInput = styled.input`
  ${controlStyles}
  width: 100%;
  padding-left: 34px;
`

export const FilterSelect = styled.select`
  ${controlStyles}
  cursor: pointer;
`

export const ClearFilters = styled.button`
  padding: 8px;
  border: none;
  background: none;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const Columns = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 12px;
  overflow-x: auto;
`

export const AddColumnTile = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 280px;
  padding: 14px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: var(--color-accent);
    background: var(--color-accent-bg);
    color: var(--color-accent);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const AddColumnForm = styled.form`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 280px;
  padding: 12px;
  background: var(--color-neutral-bg);
  border-radius: var(--radius);
`

export const AddColumnActions = styled.div`
  display: flex;
  gap: 8px;
`
