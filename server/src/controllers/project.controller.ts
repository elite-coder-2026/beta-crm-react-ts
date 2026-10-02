import type { RequestHandler } from 'express'
import { pickFields, textId } from '../lib/request.js'
import { PROJECT_FIELDS } from '../repositories/project.repository.js'
import { projectService } from '../services/project.service.js'

const FIELDS = Object.keys(PROJECT_FIELDS)

export const projectController = {
  list: (async (_req, res) => {
    res.json({ data: await projectService.list() })
  }) satisfies RequestHandler,

  getById: (async (req, res) => {
    res.json({ data: await projectService.getById(textId(req.params.id)) })
  }) satisfies RequestHandler,

  create: (async (req, res) => {
    const project = await projectService.create(pickFields(req.body, FIELDS))
    res.status(201).location(`/api/projects/${project.id}`).json({ data: project })
  }) satisfies RequestHandler,

  update: (async (req, res) => {
    const fields = pickFields(req.body, FIELDS, { requireOne: true })
    res.json({ data: await projectService.update(textId(req.params.id), fields) })
  }) satisfies RequestHandler,

  remove: (async (req, res) => {
    await projectService.remove(textId(req.params.id))
    res.status(204).end()
  }) satisfies RequestHandler,
}
