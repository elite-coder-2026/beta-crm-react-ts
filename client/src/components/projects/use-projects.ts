import { useCallback, useState } from 'react'
import { createId } from '../../utils/create-id'
import type { KanbanBoardState } from '../kanban/kanban-types'
import { createBoardFromTemplate } from './project-templates'
import type { NewProjectValues, Project } from './project-types'

export function useProjects(initialProjects: Project[]) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    initialProjects[0]?.id ?? null,
  )

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0] ?? null

  const addProject = useCallback((values: NewProjectValues) => {
    const project: Project = {
      id: createId('project'),
      name: values.name,
      description: values.description,
      color: values.color,
      board: createBoardFromTemplate(values.templateId),
    }

    setProjects((current) => [...current, project])
    setActiveProjectId(project.id)
    return project
  }, [])

  const updateProjectBoard = useCallback(
    (projectId: string, board: KanbanBoardState) =>
      setProjects((current) =>
        current.some((p) => p.id === projectId && p.board !== board)
          ? current.map((p) => (p.id === projectId ? { ...p, board } : p))
          : current,
      ),
    [],
  )

  return { projects, activeProject, setActiveProjectId, addProject, updateProjectBoard }
}
