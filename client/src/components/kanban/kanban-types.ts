export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent'

export const kanbanPriorities: KanbanPriority[] = ['low', 'medium', 'high', 'urgent']

export const kanbanColumnColors = [
  'var(--color-neutral)',
  'var(--color-info)',
  'var(--color-warning)',
  'var(--color-success)',
  'var(--color-accent)',
  'var(--color-danger)',
]

export interface KanbanCardData {
  id: string
  title: string
  description: string
  priority: KanbanPriority
  assigneeId: number | null
  /** ISO date, e.g. 2026-10-02 */
  dueDate: string | null
  tags: string[]
}

export interface KanbanColumnData {
  id: string
  title: string
  color: string
  /** Cards in a "done" column are never shown as overdue. */
  isDone?: boolean
  cardIds: string[]
}

export interface KanbanBoardState {
  columns: KanbanColumnData[]
  cards: Record<string, KanbanCardData>
}

export interface DropTarget {
  columnId: string
  /** Insert before this card; null means the end of the column. */
  beforeCardId: string | null
}
