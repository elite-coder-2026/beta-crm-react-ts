import styled from 'styled-components'

export const SortButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: none;
  color: ${({ $active }) => ($active ? 'var(--color-accent)' : 'inherit')};
  font: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  cursor: pointer;

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    border-radius: 4px;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const SortIcon = styled.span<{ $active: boolean }>`
  font-size: 10px;
  opacity: ${({ $active }) => ($active ? 1 : 0.35)};
`

export const SortableRow = styled.tr`
  &:hover {
    background: var(--color-hover);
  }
`
