import styled from 'styled-components'
import type { MemberStatus } from './members-list'

const statusStyles: Record<MemberStatus, { color: string; background: string }> = {
  active: { color: 'var(--color-success)', background: 'var(--color-success-bg)' },
  inactive: { color: 'var(--color-neutral)', background: 'var(--color-neutral-bg)' },
  pending: { color: 'var(--color-warning)', background: 'var(--color-warning-bg)' },
}

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const Count = styled.span`
  font-size: 14px;
  color: var(--color-text-muted);
`

export const List = styled.ul`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
`

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  transition: background 0.15s ease;

  & + & {
    border-top: 1px solid var(--color-border-subtle);
  }

  &:hover {
    background: var(--color-hover);
  }
`

export const Avatar = styled.div`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 600;
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const Name = styled.span`
  font-weight: 600;
`

export const Meta = styled.span`
  font-size: 13px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StatusBadge = styled.span<{ $status: MemberStatus }>`
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ $status }) => statusStyles[$status].color};
  background: ${({ $status }) => statusStyles[$status].background};
`

export const Empty = styled.p`
  padding: 32px;
  text-align: center;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
`
