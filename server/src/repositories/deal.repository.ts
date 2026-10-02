import { query } from '../db/pool.js'
import { toColumns } from '../db/sql.js'

export interface Deal {
  id: number
  company: string
  ownerId: number
  source: 'Website' | 'Referral' | 'Outbound' | 'Events' | 'Partners'
  value: number
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  lostAtStage: number | null
  createdAt: string
  closedAt: string | null
}

const SELECT = `id, company, owner_id AS "ownerId", source, value, stage, lost_at_stage AS "lostAtStage", created_at AS "createdAt", closed_at AS "closedAt"`

/** API field → column. Only these can be written. */
export const DEAL_FIELDS = {
  company: 'company',
  ownerId: 'owner_id',
  source: 'source',
  value: 'value',
  stage: 'stage',
  lostAtStage: 'lost_at_stage',
} as const

export type DealFields = Partial<Record<keyof typeof DEAL_FIELDS, unknown>>

/** Raw SQL for the deals table. */
export const dealRepository = {
  async findAll() {
    const { rows } = await query<Deal>(`SELECT ${SELECT} FROM deals ORDER BY id`)
    return rows
  },

  async findById(id: number) {
    const { rows } = await query<Deal>(`SELECT ${SELECT} FROM deals WHERE id = $1`, [id])
    return rows[0] ?? null
  },

  async create(fields: DealFields) {
    const { columns, placeholders, values } = toColumns(fields, DEAL_FIELDS)
    const { rows } = await query<Deal>(
      columns.length === 0
        ? `INSERT INTO deals DEFAULT VALUES RETURNING ${SELECT}`
        : `INSERT INTO deals (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING ${SELECT}`,
      values,
    )
    return rows[0]!
  },

  async update(id: number, fields: DealFields) {
    const { assignments, values } = toColumns(fields, DEAL_FIELDS)
    const { rows } = await query<Deal>(
      `UPDATE deals SET ${assignments.join(', ')} WHERE id = $${values.length + 1} RETURNING ${SELECT}`,
      [...values, id],
    )
    return rows[0] ?? null
  },

  async delete(id: number) {
    const { rowCount } = await query('DELETE FROM deals WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  },
}
