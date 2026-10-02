import { notFound } from '../lib/http-error.js'
import { memberRepository, type MemberFields } from '../repositories/member.repository.js'

/** Member operations. Validation and rules live in the SQL schema (src/schemas). */
export const memberService = {
  list: () => memberRepository.findAll(),

  async getById(id: number) {
    const member = await memberRepository.findById(id)
    if (!member) throw notFound(`Member ${id} not found`)
    return member
  },

  create: (fields: MemberFields) => memberRepository.create(fields),

  async update(id: number, fields: MemberFields) {
    const member = await memberRepository.update(id, fields)
    if (!member) throw notFound(`Member ${id} not found`)
    return member
  },

  async remove(id: number) {
    const deleted = await memberRepository.delete(id)
    if (!deleted) throw notFound(`Member ${id} not found`)
  },
}
