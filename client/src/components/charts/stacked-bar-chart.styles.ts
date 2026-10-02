import styled from 'styled-components'

export const Rows = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const Row = styled.div<{ $dimmed: boolean }>`
  display: grid;
  grid-template-columns: minmax(80px, 160px) 1fr;
  align-items: center;
  gap: 12px;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.55 : 1)};
  transition: opacity 0.15s ease;

  &:focus-visible {
    outline: none;
    border-radius: 4px;
    box-shadow: 0 0 0 2px var(--color-accent);
  }
`

export const RowLabel = styled.span`
  overflow: hidden;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const StackArea = styled.div`
  position: relative;
  width: calc(100% - 56px);
  height: 20px;
`

/** Segments are separated by a 2px gap, never by a stroke. */
export const Stack = styled.div`
  display: flex;
  gap: 2px;
  height: 100%;
  min-width: 2px;

  & > :last-child {
    border-radius: 0 4px 4px 0;
  }
`

export const Segment = styled.div`
  flex-basis: 0;
  min-width: 2px;
  height: 100%;
`

export const Total = styled.span`
  position: absolute;
  top: 50%;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  transform: translateY(-50%);
`
