import styled, { keyframes } from 'styled-components'
import { Td, Th } from '../basic-table.styles'
import type { InvoiceStatus } from './invoice-types'

const statusColors: Record<InvoiceStatus, { color: string; background: string }> = {
  draft: { color: 'var(--color-neutral)', background: 'var(--color-neutral-bg)' },
  sent: { color: 'var(--color-info)', background: 'var(--color-info-bg)' },
  overdue: { color: 'var(--color-danger)', background: 'var(--color-danger-bg)' },
  paid: { color: 'var(--color-success)', background: 'var(--color-success-bg)' },
  void: { color: 'var(--color-text-muted)', background: 'var(--color-neutral-bg)' },
}

const slide = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(250%); }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 12px;
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const Summary = styled.span`
  font-size: 14px;
  color: var(--color-text-muted);
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-border)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--color-accent-bg)' : 'var(--color-surface)')};
  color: ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-text)')};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: var(--color-accent);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const ChipCount = styled.span`
  min-width: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--color-neutral-bg);
  color: var(--color-text-muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  text-align: center;
`

export const TablePanel = styled.div`
  position: relative;
`

export const LoadingBar = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  z-index: 1;
  height: 2px;
  overflow: hidden;
  border-radius: var(--radius) var(--radius) 0 0;

  &::after {
    content: '';
    display: block;
    width: 40%;
    height: 100%;
    background: var(--color-accent);
    animation: ${slide} 1s ease-in-out infinite;
  }
`

export const Body = styled.tbody<{ $stale: boolean }>`
  opacity: ${({ $stale }) => ($stale ? 0.5 : 1)};
  transition: opacity 0.15s ease;
`

export const RightTh = styled(Th)`
  text-align: right;
`

export const RightTd = styled(Td)`
  text-align: right;
  font-variant-numeric: tabular-nums;
`

export const InvoiceNumber = styled.span`
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`

export const Stack = styled.span`
  display: flex;
  flex-direction: column;
`

export const Muted = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

export const OverdueNote = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-danger);
`

export const StatusBadge = styled.span<{ $status: InvoiceStatus }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $status }) => statusColors[$status].color};
  background: ${({ $status }) => statusColors[$status].background};
  text-decoration: ${({ $status }) => ($status === 'void' ? 'line-through' : 'none')};
`

export const MessageCell = styled(Td)`
  padding: 40px 16px;
  text-align: center;
  white-space: normal;
  color: var(--color-text-muted);
`

export const MessageActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-muted);
`

export const Pager = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const PageSizeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PageButtons = styled.div`
  display: flex;
  gap: 4px;
`

export const PageButton = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--color-hover);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`
