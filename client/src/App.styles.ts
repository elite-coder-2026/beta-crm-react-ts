import styled from 'styled-components'

export const Main = styled.main<{ $wide?: boolean }>`
  width: 100%;
  min-width: 0;
  max-width: ${({ $wide }) => ($wide ? 'none' : '960px')};
  padding: 48px 32px;

  @media (max-width: 720px) {
    padding: 24px 16px;
  }
`

export const ShowcaseTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const ShowcaseRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`

export const ShowcaseSubtitle = styled.h3`
  margin: 32px 0 12px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
`

export const ShowcaseStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
`
