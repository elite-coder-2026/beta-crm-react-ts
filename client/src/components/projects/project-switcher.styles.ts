import styled from 'styled-components'

export const SwitcherRoot = styled.div`
  position: relative;
`

export const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: -10px;
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;

  &:hover,
  &[aria-expanded='true'] {
    background: var(--color-surface);
    border-color: var(--color-border);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }

  & > svg {
    color: var(--color-text-muted);
  }
`

export const ProjectDot = styled.span<{ $color: string; $size?: number }>`
  flex-shrink: 0;
  width: ${({ $size = 10 }) => $size}px;
  height: ${({ $size = 10 }) => $size}px;
  border-radius: 3px;
  background: ${({ $color }) => $color};
`

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: -10px;
  z-index: 50;
  min-width: 300px;
  padding: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
`

export const MenuLabel = styled.div`
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
`

export const MenuItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? 'var(--color-accent-bg)' : 'transparent')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? 'var(--color-accent-bg)' : 'var(--color-hover)')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--color-accent);
  }

  & > svg {
    flex-shrink: 0;
    color: var(--color-accent);
  }
`

export const ItemName = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ItemCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
`

export const Divider = styled.div`
  height: 1px;
  margin: 6px 0;
  background: var(--color-border);
`
