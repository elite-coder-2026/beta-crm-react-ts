import styled from 'styled-components'
import type { KanbanPriority } from './kanban-types'

const priorityColors: Record<KanbanPriority, { color: string; background: string }> = {
  low: { color: 'var(--color-neutral)', background: 'var(--color-neutral-bg)' },
  medium: { color: 'var(--color-info)', background: 'var(--color-info-bg)' },
  high: { color: 'var(--color-warning)', background: 'var(--color-warning-bg)' },
  urgent: { color: 'var(--color-danger)', background: 'var(--color-danger-bg)' },
}

export const CardRoot = styled.div<{ $dragging: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  opacity: ${({ $dragging }) => ($dragging ? 0.4 : 1)};
  cursor: grab;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

export const Tag = styled.span`
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: 11px;
  font-weight: 600;
`

export const CardTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  word-break: break-word;
`

export const CardDescription = styled.p`
  display: -webkit-box;
  overflow: hidden;
  font-size: 13px;
  color: var(--color-text-muted);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 2px;
`

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`

export const PriorityBadge = styled.span<{ $priority: KanbanPriority }>`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ $priority }) => priorityColors[$priority].color};
  background: ${({ $priority }) => priorityColors[$priority].background};
`

export const DueDate = styled.span<{ $overdue: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: ${({ $overdue }) => ($overdue ? 600 : 400)};
  color: ${({ $overdue }) => ($overdue ? 'var(--color-danger)' : 'var(--color-text-muted)')};

  & > svg {
    width: 13px;
    height: 13px;
  }
`

export const AssigneeAvatar = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: 11px;
  font-weight: 600;
`

export const UnassignedAvatar = styled.span`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border: 1px dashed var(--color-text-muted);
  border-radius: 50%;
  opacity: 0.6;
`
