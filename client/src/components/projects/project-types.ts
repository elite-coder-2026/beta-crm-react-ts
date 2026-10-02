import type { KanbanBoardState } from '../kanban/kanban-types'

export type ProjectTemplateId = 'basic' | 'sales' | 'software' | 'empty'

export interface Project {
  id: string
  name: string
  description: string
  color: string
  board: KanbanBoardState
}

export interface NewProjectValues {
  name: string
  description: string
  color: string
  templateId: ProjectTemplateId
}
