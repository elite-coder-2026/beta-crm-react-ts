import type { DragEvent, KeyboardEvent } from 'react'
import type { Member } from '../members-list'
import type { KanbanCardData } from './kanban-types'
import { CalendarIcon } from '../../icons'
import { getInitials } from '../../utils/get-initials'
import { formatShortDate, todayISO } from '../../utils/dates'
import {
  AssigneeAvatar,
  CardDescription,
  CardFooter,
  CardMeta,
  CardRoot,
  CardTitle,
  DueDate,
  PriorityBadge,
  Tag,
  Tags,
  UnassignedAvatar,
} from './kanban-card.styles'

interface KanbanCardProps {
  card: KanbanCardData
  assignee?: Member
  isInDoneColumn: boolean
  isDragging: boolean
  onOpen: () => void
  onDragStart: () => void
  onDragEnd: () => void
  onDragOver: (event: DragEvent<HTMLDivElement>) => void
}

function KanbanCard({
  card,
  assignee,
  isInDoneColumn,
  isDragging,
  onOpen,
  onDragStart,
  onDragEnd,
  onDragOver,
}: KanbanCardProps) {
  const isOverdue = !isInDoneColumn && card.dueDate !== null && card.dueDate < todayISO()

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', card.id)
    onDragStart()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <CardRoot
      $dragging={isDragging}
      role="button"
      tabIndex={0}
      draggable
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {card.tags.length > 0 && (
        <Tags>
          {card.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      )}

      <CardTitle>{card.title}</CardTitle>
      {card.description && <CardDescription>{card.description}</CardDescription>}

      <CardFooter>
        <CardMeta>
          <PriorityBadge $priority={card.priority}>{card.priority}</PriorityBadge>
          {card.dueDate && (
            <DueDate $overdue={isOverdue} title={isOverdue ? 'Overdue' : 'Due date'}>
              <CalendarIcon />
              {formatShortDate(card.dueDate)}
            </DueDate>
          )}
        </CardMeta>
        {assignee ? (
          <AssigneeAvatar title={assignee.name}>{getInitials(assignee.name)}</AssigneeAvatar>
        ) : (
          <UnassignedAvatar title="Unassigned" />
        )}
      </CardFooter>
    </CardRoot>
  )
}

export default KanbanCard
