import { notFound } from '../lib/http-error.js'
import { invoiceRepository, type InvoiceFields } from '../repositories/invoice.repository.js'

/** Invoice operations. Validation and rules live in the SQL schema (src/schemas). */
export const invoiceService = {
  list: () => invoiceRepository.findAll(),

  async getById(id: number) {
    const invoice = await invoiceRepository.findById(id)
    if (!invoice) throw notFound(`Invoice ${id} not found`)
    return invoice
  },

  create: (fields: InvoiceFields) => invoiceRepository.create(fields),

  async update(id: number, fields: InvoiceFields) {
    const invoice = await invoiceRepository.update(id, fields)
    if (!invoice) throw notFound(`Invoice ${id} not found`)
    return invoice
  },

  async remove(id: number) {
    const deleted = await invoiceRepository.delete(id)
    if (!deleted) throw notFound(`Invoice ${id} not found`)
  },
}
