import { Fragment, useState, type DragEvent, type FormEvent, type KeyboardEvent } from 'react'
import type { Member } from '../members-list'
import type { DropTarget, KanbanCardData, KanbanColumnData } from './kanban-types'
import KanbanCard from './kanban-card'
import PrimaryButton from '../buttons/primary-button'
import SecondaryButton from '../buttons/secondary-button'
import { PlusIcon, TrashIcon } from '../../icons'
import {
  AddCardButton,
  CardList,
  ColumnHeader,
  ColumnRoot,
  ColumnTitle,
  Composer,
  ComposerActions,
  ComposerInput,
  Count,
  Dot,
  DropIndicator,
  EmptyColumn,
  IconButton,
} from './kanban-column.styles'

interface KanbanColumnProps {
  column: KanbanColumnData
  /** The cards to show, after filters are applied. */
  cards: KanbanCardData[]
  membersById: Map<number, Member>
  draggingCardId: string | null
  dropTarget: DropTarget | null
  onCardDragStart: (cardId: string) => void
  onDragEnd: () => void
  onDropTargetChange: (target: DropTarget) => void
  onDrop: () => void
  onOpenCard: (cardId: string) => void
  onAddCard: (title: string) => void
  onDeleteColumn: () => void
}

function KanbanColumn({
  column,
  cards,
  membersById,
  draggingCardId,
  dropTarget,
  onCardDragStart,
  onDragEnd,
  onDropTargetChange,
  onDrop,
  onOpenCard,
  onAddCard,
  onDeleteColumn,
}: KanbanColumnProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [draft, setDraft] = useState('')

  const totalCount = column.cardIds.length
  const isDropTarget = draggingCardId !== null && dropTarget?.columnId === column.id
  const showIndicatorBefore = (cardId: string | null) =>
    isDropTarget && dropTarget?.beforeCardId === cardId

  const handleColumnDragOver = (event: DragEvent<HTMLElement>) => {
    if (!draggingCardId) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    // Entering from another column drops at the end; within the column, keep the
    // position the last hovered card set so the gaps between cards don't flicker.
    if (dropTarget?.columnId !== column.id) {
      onDropTargetChange({ columnId: column.id, beforeCardId: null })
    }
  }

  const handleCardDragOver = (event: DragEvent<HTMLDivElement>, index: number) => {
    if (!draggingCardId) return
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = 'move'

    const rect = event.currentTarget.getBoundingClientRect()
    const isTopHalf = event.clientY < rect.top + rect.height / 2
    onDropTargetChange({
      columnId: column.id,
      beforeCardId: isTopHalf ? cards[index].id : (cards[index + 1]?.id ?? null),
    })
  }

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    onDrop()
  }

  const closeComposer = () => {
    setIsAdding(false)
    setDraft('')
  }

  const submitDraft = () => {
    const title = draft.trim()
    if (!title) return
    onAddCard(title)
    setDraft('')
  }

  const handleComposerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitDraft()
  }

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitDraft()
    } else if (event.key === 'Escape') {
      closeComposer()
    }
  }

  return (
    <ColumnRoot
      $isDropTarget={isDropTarget}
      aria-label={column.title}
      onDragOver={handleColumnDragOver}
      onDrop={handleDrop}
    >
      <ColumnHeader>
        <Dot $color={column.color} />
        <ColumnTitle>{column.title}</ColumnTitle>
        <Count>{cards.length === totalCount ? totalCount : `${cards.length}/${totalCount}`}</Count>
        <IconButton
          type="button"
          title="Add card"
          aria-label={`Add card to ${column.title}`}
          onClick={() => setIsAdding(true)}
        >
          <PlusIcon />
        </IconButton>
        {totalCount === 0 && (
          <IconButton
            type="button"
            title="Delete column"
            aria-label={`Delete column ${column.title}`}
            onClick={onDeleteColumn}
          >
            <TrashIcon />
          </IconButton>
        )}
      </ColumnHeader>

      <CardList>
        {cards.map((card, index) => (
          <Fragment key={card.id}>
            {showIndicatorBefore(card.id) && <DropIndicator />}
            <KanbanCard
              card={card}
              assignee={card.assigneeId !== null ? membersById.get(card.assigneeId) : undefined}
              isInDoneColumn={Boolean(column.isDone)}
              isDragging={card.id === draggingCardId}
              onOpen={() => onOpenCard(card.id)}
              onDragStart={() => onCardDragStart(card.id)}
              onDragEnd={onDragEnd}
              onDragOver={(event) => handleCardDragOver(event, index)}
            />
          </Fragment>
        ))}
        {showIndicatorBefore(null) && <DropIndicator />}
        {cards.length === 0 && !isDropTarget && (
          <EmptyColumn>{totalCount === 0 ? 'No cards yet' : 'No matching cards'}</EmptyColumn>
        )}
      </CardList>

      {isAdding ? (
        <Composer onSubmit={handleComposerSubmit}>
          <ComposerInput
            aria-label="Card title"
            placeholder="Enter a title for this card…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleComposerKeyDown}
            autoFocus
          />
          <ComposerActions>
            <PrimaryButton type="submit" disabled={!draft.trim()}>
              Add card
            </PrimaryButton>
            <SecondaryButton onClick={closeComposer}>Cancel</SecondaryButton>
          </ComposerActions>
        </Composer>
      ) : (
        <AddCardButton type="button" onClick={() => setIsAdding(true)}>
          <PlusIcon />
          Add card
        </AddCardButton>
      )}
    </ColumnRoot>
  )
}

export default KanbanColumn
