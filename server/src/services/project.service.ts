import { notFound } from '../lib/http-error.js'
import { projectRepository, type ProjectFields } from '../repositories/project.repository.js'

/** Project operations. Validation and rules live in the SQL schema (src/schemas). */
export const projectService = {
  list: () => projectRepository.findAll(),

  async getById(id: string) {
    const project = await projectRepository.findById(id)
    if (!project) throw notFound(`Project ${id} not found`)
    return project
  },

  create: (fields: ProjectFields) => projectRepository.create(fields),

  async update(id: string, fields: ProjectFields) {
    const project = await projectRepository.update(id, fields)
    if (!project) throw notFound(`Project ${id} not found`)
    return project
  },

  async remove(id: string) {
    const deleted = await projectRepository.delete(id)
    if (!deleted) throw notFound(`Project ${id} not found`)
  },
}
