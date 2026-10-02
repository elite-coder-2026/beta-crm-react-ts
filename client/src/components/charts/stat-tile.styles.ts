import styled from 'styled-components'

export const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`

export const Tile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 16px 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`

export const Label = styled.span`
  font-size: 13px;
  color: var(--color-text-muted);
`

export const Value = styled.span`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
`

export const Delta = styled.span<{ $tone: 'good' | 'bad' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'good'
      ? 'var(--color-success)'
      : $tone === 'bad'
        ? 'var(--color-danger)'
        : 'var(--color-text-muted)'};
`

export const DeltaPeriod = styled.span`
  font-weight: 400;
  color: var(--color-text-muted);
`

export const Sparkline = styled.div`
  height: 32px;
  margin-top: 4px;

  & svg {
    display: block;
    overflow: visible;
  }
`
