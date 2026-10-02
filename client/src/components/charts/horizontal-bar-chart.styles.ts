import styled from 'styled-components'

export const Rows = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Row = styled.div<{ $dimmed: boolean }>`
  display: grid;
  grid-template-columns: minmax(80px, 140px) 1fr;
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

export const FillArea = styled.div`
  position: relative;
  width: calc(100% - 64px);
  height: 20px;
`

export const Fill = styled.div`
  height: 100%;
  min-width: 2px;
  border-radius: 0 4px 4px 0;
`

export const Value = styled.span`
  position: absolute;
  top: 50%;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  transform: translateY(-50%);
`
