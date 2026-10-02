import type { RequestHandler } from 'express'
import { numericId, pickFields } from '../lib/request.js'
import { MEMBER_FIELDS } from '../repositories/member.repository.js'
import { memberService } from '../services/member.service.js'

const FIELDS = Object.keys(MEMBER_FIELDS)

export const memberController = {
  list: (async (_req, res) => {
    res.json({ data: await memberService.list() })
  }) satisfies RequestHandler,

  getById: (async (req, res) => {
    res.json({ data: await memberService.getById(numericId(req.params.id)) })
  }) satisfies RequestHandler,

  create: (async (req, res) => {
    const member = await memberService.create(pickFields(req.body, FIELDS))
    res.status(201).location(`/api/members/${member.id}`).json({ data: member })
  }) satisfies RequestHandler,

  update: (async (req, res) => {
    const fields = pickFields(req.body, FIELDS, { requireOne: true })
    res.json({ data: await memberService.update(numericId(req.params.id), fields) })
  }) satisfies RequestHandler,

  remove: (async (req, res) => {
    await memberService.remove(numericId(req.params.id))
    res.status(204).end()
  }) satisfies RequestHandler,
}
