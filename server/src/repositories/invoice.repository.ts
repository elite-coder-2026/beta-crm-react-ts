import { query } from '../db/pool.js'
import { toColumns } from '../db/sql.js'

export interface Invoice {
  id: number
  number: string
  customer: string
  email: string
  amount: number
  status: 'draft' | 'sent' | 'overdue' | 'paid' | 'void'
  issueDate: string
  dueDate: string
}

const SELECT = `id, number, customer, email, amount, status, issue_date AS "issueDate", due_date AS "dueDate"`

/** API field → column. Only these can be written. */
export const INVOICE_FIELDS = {
  customer: 'customer',
  email: 'email',
  amount: 'amount',
  status: 'status',
  issueDate: 'issue_date',
  dueDate: 'due_date',
} as const

export type InvoiceFields = Partial<Record<keyof typeof INVOICE_FIELDS, unknown>>

/** Raw SQL for the invoices table. */
export const invoiceRepository = {
  async findAll() {
    const { rows } = await query<Invoice>(`SELECT ${SELECT} FROM invoices ORDER BY id`)
    return rows
  },

  async findById(id: number) {
    const { rows } = await query<Invoice>(`SELECT ${SELECT} FROM invoices WHERE id = $1`, [id])
    return rows[0] ?? null
  },

  async create(fields: InvoiceFields) {
    const { columns, placeholders, values } = toColumns(fields, INVOICE_FIELDS)
    const { rows } = await query<Invoice>(
      columns.length === 0
        ? `INSERT INTO invoices DEFAULT VALUES RETURNING ${SELECT}`
        : `INSERT INTO invoices (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING ${SELECT}`,
      values,
    )
    return rows[0]!
  },

  async update(id: number, fields: InvoiceFields) {
    const { assignments, values } = toColumns(fields, INVOICE_FIELDS)
    const { rows } = await query<Invoice>(
      `UPDATE invoices SET ${assignments.join(', ')} WHERE id = $${values.length + 1} RETURNING ${SELECT}`,
      [...values, id],
    )
    return rows[0] ?? null
  },

  async delete(id: number) {
    const { rowCount } = await query('DELETE FROM invoices WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  },
}
