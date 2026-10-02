import type { RequestHandler } from 'express'
import { numericId, pickFields } from '../lib/request.js'
import { DEAL_FIELDS } from '../repositories/deal.repository.js'
import { dealService } from '../services/deal.service.js'

const FIELDS = Object.keys(DEAL_FIELDS)

export const dealController = {
  list: (async (_req, res) => {
    res.json({ data: await dealService.list() })
  }) satisfies RequestHandler,

  getById: (async (req, res) => {
    res.json({ data: await dealService.getById(numericId(req.params.id)) })
  }) satisfies RequestHandler,

  create: (async (req, res) => {
    const deal = await dealService.create(pickFields(req.body, FIELDS))
    res.status(201).location(`/api/deals/${deal.id}`).json({ data: deal })
  }) satisfies RequestHandler,

  update: (async (req, res) => {
    const fields = pickFields(req.body, FIELDS, { requireOne: true })
    res.json({ data: await dealService.update(numericId(req.params.id), fields) })
  }) satisfies RequestHandler,

  remove: (async (req, res) => {
    await dealService.remove(numericId(req.params.id))
    res.status(204).end()
  }) satisfies RequestHandler,
}
