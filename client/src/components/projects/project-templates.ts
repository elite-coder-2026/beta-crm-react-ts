import { createId } from '../../utils/create-id'
import { kanbanColumnColors, type KanbanBoardState } from '../kanban/kanban-types'
import type { ProjectTemplateId } from './project-types'

interface TemplateColumn {
  title: string
  isDone?: boolean
}

export interface ProjectTemplate {
  id: ProjectTemplateId
  name: string
  description: string
  columns: TemplateColumn[]
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Simple task tracking',
    columns: [{ title: 'To do' }, { title: 'In progress' }, { title: 'Done', isDone: true }],
  },
  {
    id: 'sales',
    name: 'Sales pipeline',
    description: 'Move deals from lead to close',
    columns: [
      { title: 'Lead' },
      { title: 'Contacted' },
      { title: 'Proposal' },
      { title: 'Negotiation' },
      { title: 'Won', isDone: true },
    ],
  },
  {
    id: 'software',
    name: 'Software',
    description: 'Plan, build and ship features',
    columns: [
      { title: 'Backlog' },
      { title: 'To do' },
      { title: 'In progress' },
      { title: 'Review' },
      { title: 'Done', isDone: true },
    ],
  },
  {
    id: 'empty',
    name: 'Empty',
    description: 'Start from scratch',
    columns: [],
  },
]

export const projectColors = [
  'var(--color-accent)',
  'var(--color-info)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-danger)',
  'var(--color-neutral)',
]

export const createBoardFromTemplate = (templateId: ProjectTemplateId): KanbanBoardState => {
  const template = projectTemplates.find((t) => t.id === templateId) ?? projectTemplates[0]

  return {
    cards: {},
    columns: template.columns.map((column, index) => ({
      id: createId('column'),
      title: column.title,
      color: column.isDone
        ? 'var(--color-success)'
        : kanbanColumnColors[index % kanbanColumnColors.length],
      isDone: column.isDone,
      cardIds: [],
    })),
  }
}

export const getProjectStats = (board: KanbanBoardState) => {
  const total = Object.keys(board.cards).length
  const done = board.columns
    .filter((column) => column.isDone)
    .reduce((sum, column) => sum + column.cardIds.length, 0)
  const assigneeIds = [
    ...new Set(
      Object.values(board.cards)
        .map((card) => card.assigneeId)
        .filter((id): id is number => id !== null),
    ),
  ]

  return {
    total,
    done,
    percentDone: total === 0 ? 0 : Math.round((done / total) * 100),
    assigneeIds,
  }
}
