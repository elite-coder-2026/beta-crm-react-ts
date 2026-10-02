import styled from 'styled-components'

export const Report = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`

export const ReportHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px 16px;
`

export const ReportTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const ReportSubtitle = styled.p`
  font-size: 14px;
  color: var(--color-text-muted);
`

/** One row of filters above everything they scope. */
export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`

export const RangeGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  padding: 3px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
`

export const RangeButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? 'var(--color-accent-bg)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-text-muted)')};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-text)')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-accent);
  }
`

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const SectionTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 600;
`
