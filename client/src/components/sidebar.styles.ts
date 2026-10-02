import styled from 'styled-components'

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 16px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);

  @media (max-width: 720px) {
    position: static;
    height: auto;
    padding: 12px 16px;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
`

export const Brand = styled.div`
  padding: 0 12px 20px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;

  @media (max-width: 720px) {
    padding-bottom: 8px;
  }
`

export const Section = styled.div`
  & + & {
    margin-top: 24px;
  }

  @media (max-width: 720px) {
    & + & {
      margin-top: 4px;
    }
  }
`

export const SectionLabel = styled.div`
  padding: 0 12px 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);

  @media (max-width: 720px) {
    display: none;
  }
`

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 720px) {
    flex-direction: row;
    overflow-x: auto;
  }
`

export const ItemButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? 'var(--color-accent-bg)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-text)')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? 'var(--color-accent-bg)' : 'var(--color-hover)')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`
