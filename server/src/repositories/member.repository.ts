import { query } from '../db/pool.js'
import { toColumns } from '../db/sql.js'

export interface Member {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

const SELECT = `id, name, email, role, status, created_at AS "createdAt"`

/** API field → column. Only these can be written. */
export const MEMBER_FIELDS = {
  name: 'name',
  email: 'email',
  role: 'role',
  status: 'status',
} as const

export type MemberFields = Partial<Record<keyof typeof MEMBER_FIELDS, unknown>>

/** Raw SQL for the members table. */
export const memberRepository = {
  async findAll() {
    const { rows } = await query<Member>(`SELECT ${SELECT} FROM members ORDER BY id`)
    return rows
  },

  async findById(id: number) {
    const { rows } = await query<Member>(`SELECT ${SELECT} FROM members WHERE id = $1`, [id])
    return rows[0] ?? null
  },

  async create(fields: MemberFields) {
    const { columns, placeholders, values } = toColumns(fields, MEMBER_FIELDS)
    const { rows } = await query<Member>(
      columns.length === 0
        ? `INSERT INTO members DEFAULT VALUES RETURNING ${SELECT}`
        : `INSERT INTO members (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING ${SELECT}`,
      values,
    )
    return rows[0]!
  },

  async update(id: number, fields: MemberFields) {
    const { assignments, values } = toColumns(fields, MEMBER_FIELDS)
    const { rows } = await query<Member>(
      `UPDATE members SET ${assignments.join(', ')} WHERE id = $${values.length + 1} RETURNING ${SELECT}`,
      [...values, id],
    )
    return rows[0] ?? null
  },

  async delete(id: number) {
    const { rowCount } = await query('DELETE FROM members WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  },
}
