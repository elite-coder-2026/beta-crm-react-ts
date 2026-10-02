import { notFound } from '../lib/http-error.js'
import { dealRepository, type DealFields } from '../repositories/deal.repository.js'

/** Deal operations. Validation and rules live in the SQL schema (src/schemas). */
export const dealService = {
  list: () => dealRepository.findAll(),

  async getById(id: number) {
    const deal = await dealRepository.findById(id)
    if (!deal) throw notFound(`Deal ${id} not found`)
    return deal
  },

  create: (fields: DealFields) => dealRepository.create(fields),

  async update(id: number, fields: DealFields) {
    const deal = await dealRepository.update(id, fields)
    if (!deal) throw notFound(`Deal ${id} not found`)
    return deal
  },

  async remove(id: number) {
    const deleted = await dealRepository.delete(id)
    if (!deleted) throw notFound(`Deal ${id} not found`)
  },
}
