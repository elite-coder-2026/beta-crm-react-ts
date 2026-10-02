import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { Member } from '../members-list'
import {
  kanbanPriorities,
  type DropTarget,
  type KanbanBoardState,
  type KanbanCardData,
  type KanbanColumnData,
  type KanbanPriority,
} from './kanban-types'
import { useKanbanBoard } from './use-kanban-board'
import KanbanColumn from './kanban-column'
import KanbanCardModal from './kanban-card-modal'
import PrimaryButton from '../buttons/primary-button'
import SecondaryButton from '../buttons/secondary-button'
import { useToast } from '../toasts/toast-context'
import { Input } from '../forms/form.styles'
import { PlusIcon, SearchIcon } from '../../icons'
import {
  AddColumnActions,
  AddColumnForm,
  AddColumnTile,
  Board,
  BoardHeader,
  BoardSummary,
  BoardTitle,
  ClearFilters,
  Columns,
  FilterSelect,
  SearchField,
  SearchInput,
  Toolbar,
} from './kanban-board.styles'

interface KanbanBoardProps {
  initialBoard: KanbanBoardState
  members: Member[]
  title?: string
  /** Replaces the title, e.g. with a project switcher. */
  header?: ReactNode
  /** Called whenever the board changes, so a parent can keep it. */
  onBoardChange?: (board: KanbanBoardState) => void
}

const ALL = 'all'
const UNASSIGNED = 'unassigned'

function KanbanBoard({
  initialBoard,
  members,
  title = 'Kanban board',
  header,
  onBoardChange,
}: KanbanBoardProps) {
  const {
    board,
    addCard,
    updateCard,
    deleteCard,
    restoreCard,
    moveCard,
    addColumn,
    deleteColumn,
  } = useKanbanBoard(initialBoard)
  const { toast } = useToast()

  const onBoardChangeRef = useRef(onBoardChange)
  useEffect(() => {
    onBoardChangeRef.current = onBoardChange
  })
  useEffect(() => {
    if (board !== initialBoard) onBoardChangeRef.current?.(board)
  }, [board, initialBoard])

  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<KanbanPriority | typeof ALL>(ALL)
  const [assigneeFilter, setAssigneeFilter] = useState<string>(ALL)

  const [draggingCardId, setDraggingCardId] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [columnDraft, setColumnDraft] = useState('')

  const membersById = useMemo(() => new Map(members.map((m) => [m.id, m])), [members])
  const totalCards = Object.keys(board.cards).length

  const query = search.trim().toLowerCase()
  const hasFilters = query !== '' || priorityFilter !== ALL || assigneeFilter !== ALL

  const matchesFilters = (card: KanbanCardData) => {
    if (priorityFilter !== ALL && card.priority !== priorityFilter) return false
    if (assigneeFilter === UNASSIGNED && card.assigneeId !== null) return false
    if (
      assigneeFilter !== ALL &&
      assigneeFilter !== UNASSIGNED &&
      card.assigneeId !== Number(assigneeFilter)
    ) {
      return false
    }
    if (!query) return true
    return [card.title, card.description, ...card.tags].some((text) =>
      text.toLowerCase().includes(query),
    )
  }

  const clearFilters = () => {
    setSearch('')
    setPriorityFilter(ALL)
    setAssigneeFilter(ALL)
  }

  const findColumnOfCard = (cardId: string) =>
    board.columns.find((column) => column.cardIds.includes(cardId))

  // Drag and drop

  const updateDropTarget = useCallback(
    (target: DropTarget) =>
      setDropTarget((current) =>
        current?.columnId === target.columnId && current.beforeCardId === target.beforeCardId
          ? current
          : target,
      ),
    [],
  )

  const endDrag = useCallback(() => {
    setDraggingCardId(null)
    setDropTarget(null)
  }, [])

  const handleDrop = () => {
    if (draggingCardId && dropTarget) {
      moveCard(draggingCardId, dropTarget.columnId, dropTarget.beforeCardId)
    }
    endDrag()
  }

  const handleBoardDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDropTarget(null)
    }
  }

  // Cards

  const editingCard = editingCardId ? board.cards[editingCardId] : undefined
  const editingColumn = editingCardId ? findColumnOfCard(editingCardId) : undefined
  const closeCardModal = useCallback(() => setEditingCardId(null), [])

  const handleSaveCard = (card: KanbanCardData, columnId: string) => {
    updateCard(card, columnId)
    setEditingCardId(null)
    toast({ variant: 'success', message: 'Card updated' })
  }

  const handleDeleteCard = (cardId: string) => {
    const column = findColumnOfCard(cardId)
    const card = board.cards[cardId]
    if (!column || !card) return

    const index = column.cardIds.indexOf(cardId)
    deleteCard(cardId)
    setEditingCardId(null)
    toast({
      message: `Deleted “${card.title}”`,
      action: { label: 'Undo', onClick: () => restoreCard(card, column.id, index) },
    })
  }

  // Columns

  const closeColumnForm = () => {
    setIsAddingColumn(false)
    setColumnDraft('')
  }

  const handleAddColumn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const columnTitle = columnDraft.trim()
    if (!columnTitle) return
    addColumn(columnTitle)
    closeColumnForm()
  }

  const handleDeleteColumn = (column: KanbanColumnData) => {
    deleteColumn(column.id)
    toast({ message: `Deleted column “${column.title}”` })
  }

  return (
    <Board>
      <BoardHeader>
        {header ?? <BoardTitle>{title}</BoardTitle>}
        <BoardSummary>
          {totalCards} {totalCards === 1 ? 'card' : 'cards'} · {board.columns.length} columns
        </BoardSummary>
      </BoardHeader>

      <Toolbar>
        <SearchField>
          <SearchIcon />
          <SearchInput
            type="search"
            aria-label="Search cards"
            placeholder="Search cards…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </SearchField>
        <FilterSelect
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value as KanbanPriority | typeof ALL)}
        >
          <option value={ALL}>All priorities</option>
          {kanbanPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority[0].toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect
          aria-label="Filter by assignee"
          value={assigneeFilter}
          onChange={(event) => setAssigneeFilter(event.target.value)}
        >
          <option value={ALL}>All assignees</option>
          <option value={UNASSIGNED}>Unassigned</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </FilterSelect>
        {hasFilters && (
          <ClearFilters type="button" onClick={clearFilters}>
            Clear filters
          </ClearFilters>
        )}
      </Toolbar>

      <Columns onDragLeave={handleBoardDragLeave}>
        {board.columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            cards={column.cardIds.map((id) => board.cards[id]).filter(matchesFilters)}
            membersById={membersById}
            draggingCardId={draggingCardId}
            dropTarget={dropTarget}
            onCardDragStart={setDraggingCardId}
            onDragEnd={endDrag}
            onDropTargetChange={updateDropTarget}
            onDrop={handleDrop}
            onOpenCard={setEditingCardId}
            onAddCard={(cardTitle) => addCard(column.id, cardTitle)}
            onDeleteColumn={() => handleDeleteColumn(column)}
          />
        ))}

        {isAddingColumn ? (
          <AddColumnForm onSubmit={handleAddColumn}>
            <Input
              aria-label="Column name"
              placeholder="Column name"
              value={columnDraft}
              onChange={(event) => setColumnDraft(event.target.value)}
              onKeyDown={(event) => event.key === 'Escape' && closeColumnForm()}
              autoFocus
            />
            <AddColumnActions>
              <PrimaryButton type="submit" disabled={!columnDraft.trim()}>
                Add column
              </PrimaryButton>
              <SecondaryButton onClick={closeColumnForm}>Cancel</SecondaryButton>
            </AddColumnActions>
          </AddColumnForm>
        ) : (
          <AddColumnTile type="button" onClick={() => setIsAddingColumn(true)}>
            <PlusIcon />
            Add column
          </AddColumnTile>
        )}
      </Columns>

      {editingCard && editingColumn && (
        <KanbanCardModal
          key={editingCard.id}
          card={editingCard}
          columnId={editingColumn.id}
          columns={board.columns}
          members={members}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
          onClose={closeCardModal}
        />
      )}
    </Board>
  )
}

export default KanbanBoard
