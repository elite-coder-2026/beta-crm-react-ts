import { query } from '../db/pool.js'
import { toColumns } from '../db/sql.js'

export interface Project {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
  updatedAt: string
}

const SELECT = `id, name, description, color, created_at AS "createdAt", updated_at AS "updatedAt"`

/** API field → column. Only these can be written. */
export const PROJECT_FIELDS = {
  name: 'name',
  description: 'description',
  color: 'color',
} as const

export type ProjectFields = Partial<Record<keyof typeof PROJECT_FIELDS, unknown>>

/** Raw SQL for the projects table. */
export const projectRepository = {
  async findAll() {
    const { rows } = await query<Project>(`SELECT ${SELECT} FROM projects ORDER BY created_at`)
    return rows
  },

  async findById(id: string) {
    const { rows } = await query<Project>(`SELECT ${SELECT} FROM projects WHERE id = $1`, [id])
    return rows[0] ?? null
  },

  async create(fields: ProjectFields) {
    const { columns, placeholders, values } = toColumns(fields, PROJECT_FIELDS)
    const { rows } = await query<Project>(
      columns.length === 0
        ? `INSERT INTO projects DEFAULT VALUES RETURNING ${SELECT}`
        : `INSERT INTO projects (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING ${SELECT}`,
      values,
    )
    return rows[0]!
  },

  async update(id: string, fields: ProjectFields) {
    const { assignments, values } = toColumns(fields, PROJECT_FIELDS)
    const { rows } = await query<Project>(
      `UPDATE projects SET ${assignments.join(', ')} WHERE id = $${values.length + 1} RETURNING ${SELECT}`,
      [...values, id],
    )
    return rows[0] ?? null
  },

  async delete(id: string) {
    const { rowCount } = await query('DELETE FROM projects WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  },
}
