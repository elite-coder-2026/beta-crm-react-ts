import { useMemo, useReducer } from 'react'
import { createId } from '../../utils/create-id'
import { kanbanColumnColors, type KanbanBoardState, type KanbanCardData } from './kanban-types'

type Action =
  | { type: 'addCard'; id: string; columnId: string; title: string }
  | { type: 'updateCard'; card: KanbanCardData; columnId: string }
  | { type: 'deleteCard'; cardId: string }
  | { type: 'restoreCard'; card: KanbanCardData; columnId: string; index: number }
  | { type: 'moveCard'; cardId: string; toColumnId: string; beforeCardId: string | null }
  | { type: 'addColumn'; id: string; title: string }
  | { type: 'deleteColumn'; columnId: string }

const insertAt = (ids: string[], id: string, index: number) => {
  const clamped = Math.max(0, Math.min(index, ids.length))
  return [...ids.slice(0, clamped), id, ...ids.slice(clamped)]
}

const insertBefore = (ids: string[], id: string, beforeId: string | null) => {
  const index = beforeId ? ids.indexOf(beforeId) : -1
  return index === -1 ? [...ids, id] : insertAt(ids, id, index)
}

function reducer(state: KanbanBoardState, action: Action): KanbanBoardState {
  switch (action.type) {
    case 'addCard': {
      const card: KanbanCardData = {
        id: action.id,
        title: action.title,
        description: '',
        priority: 'medium',
        assigneeId: null,
        dueDate: null,
        tags: [],
      }
      return {
        cards: { ...state.cards, [card.id]: card },
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cardIds: [...column.cardIds, card.id] }
            : column,
        ),
      }
    }

    case 'updateCard': {
      const { card, columnId } = action
      return {
        cards: { ...state.cards, [card.id]: card },
        columns: state.columns.map((column) => {
          const hasCard = column.cardIds.includes(card.id)
          if (column.id === columnId) {
            return hasCard ? column : { ...column, cardIds: [...column.cardIds, card.id] }
          }
          return hasCard
            ? { ...column, cardIds: column.cardIds.filter((id) => id !== card.id) }
            : column
        }),
      }
    }

    case 'deleteCard': {
      const cards = { ...state.cards }
      delete cards[action.cardId]
      return {
        cards,
        columns: state.columns.map((column) => ({
          ...column,
          cardIds: column.cardIds.filter((id) => id !== action.cardId),
        })),
      }
    }

    case 'restoreCard':
      return {
        cards: { ...state.cards, [action.card.id]: action.card },
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cardIds: insertAt(column.cardIds, action.card.id, action.index) }
            : column,
        ),
      }

    case 'moveCard': {
      if (action.cardId === action.beforeCardId) return state
      return {
        ...state,
        columns: state.columns.map((column) => {
          const ids = column.cardIds.filter((id) => id !== action.cardId)
          return {
            ...column,
            cardIds:
              column.id === action.toColumnId
                ? insertBefore(ids, action.cardId, action.beforeCardId)
                : ids,
          }
        }),
      }
    }

    case 'addColumn':
      return {
        ...state,
        columns: [
          ...state.columns,
          {
            id: action.id,
            title: action.title,
            color: kanbanColumnColors[state.columns.length % kanbanColumnColors.length],
            cardIds: [],
          },
        ],
      }

    case 'deleteColumn': {
      const column = state.columns.find((c) => c.id === action.columnId)
      if (!column) return state
      const cards = { ...state.cards }
      column.cardIds.forEach((id) => delete cards[id])
      return { cards, columns: state.columns.filter((c) => c.id !== action.columnId) }
    }
  }
}

export function useKanbanBoard(initialBoard: KanbanBoardState) {
  const [board, dispatch] = useReducer(reducer, initialBoard)

  const actions = useMemo(
    () => ({
      addCard: (columnId: string, title: string) =>
        dispatch({ type: 'addCard', id: createId('card'), columnId, title }),
      updateCard: (card: KanbanCardData, columnId: string) =>
        dispatch({ type: 'updateCard', card, columnId }),
      deleteCard: (cardId: string) => dispatch({ type: 'deleteCard', cardId }),
      restoreCard: (card: KanbanCardData, columnId: string, index: number) =>
        dispatch({ type: 'restoreCard', card, columnId, index }),
      moveCard: (cardId: string, toColumnId: string, beforeCardId: string | null) =>
        dispatch({ type: 'moveCard', cardId, toColumnId, beforeCardId }),
      addColumn: (title: string) => dispatch({ type: 'addColumn', id: createId('column'), title }),
      deleteColumn: (columnId: string) => dispatch({ type: 'deleteColumn', columnId }),
    }),
    [],
  )

  return { board, ...actions }
}
