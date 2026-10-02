import styled from 'styled-components'
import { Td } from './basic-table.styles'

export const StripedRow = styled.tr`
  &:nth-child(even) {
    background: var(--color-bg);
  }

  &:hover {
    background: var(--color-accent-bg);
  }
`

export const StripedTd = styled(Td)`
  border-bottom: none;
`
