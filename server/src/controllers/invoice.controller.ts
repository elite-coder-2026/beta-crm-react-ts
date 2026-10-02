import type { RequestHandler } from 'express'
import { numericId, pickFields } from '../lib/request.js'
import { INVOICE_FIELDS } from '../repositories/invoice.repository.js'
import { invoiceService } from '../services/invoice.service.js'

const FIELDS = Object.keys(INVOICE_FIELDS)

export const invoiceController = {
  list: (async (_req, res) => {
    res.json({ data: await invoiceService.list() })
  }) satisfies RequestHandler,

  getById: (async (req, res) => {
    res.json({ data: await invoiceService.getById(numericId(req.params.id)) })
  }) satisfies RequestHandler,

  create: (async (req, res) => {
    const invoice = await invoiceService.create(pickFields(req.body, FIELDS))
    res.status(201).location(`/api/invoices/${invoice.id}`).json({ data: invoice })
  }) satisfies RequestHandler,

  update: (async (req, res) => {
    const fields = pickFields(req.body, FIELDS, { requireOne: true })
    res.json({ data: await invoiceService.update(numericId(req.params.id), fields) })
  }) satisfies RequestHandler,

  remove: (async (req, res) => {
    await invoiceService.remove(numericId(req.params.id))
    res.status(204).end()
  }) satisfies RequestHandler,
}
