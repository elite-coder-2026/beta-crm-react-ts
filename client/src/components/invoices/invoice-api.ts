import { sampleInvoices } from '../../data/sample-invoices'
import { daysFromNowISO } from '../../utils/dates'
import {
  invoiceStatuses,
  type Invoice,
  type InvoicePage,
  type InvoiceQuery,
  type InvoiceSort,
  type InvoiceStatus,
  type IssuedRange,
} from './invoice-types'

/**
 * A stand-in for a real `GET /invoices` endpoint with keyset (cursor) pagination.
 * Swap this module for a fetch call; the hook and table don't need to change.
 */

interface CursorPayload {
  key: InvoiceSort['key']
  direction: InvoiceSort['direction']
  /** Sort value of the last row on the previous page. */
  value: string | number
  /** Tie-breaker for rows with the same sort value. */
  id: number
}

const encodeCursor = (payload: CursorPayload) => btoa(JSON.stringify(payload))

const decodeCursor = (cursor: string): CursorPayload | null => {
  try {
    return JSON.parse(atob(cursor)) as CursorPayload
  } catch {
    return null
  }
}

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(new DOMException('Request aborted', 'AbortError'))
    })
  })

const compareValues = (a: string | number, b: string | number) =>
  typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))

const issuedSince = (range: IssuedRange) => {
  if (range === '30d') return daysFromNowISO(-30)
  if (range === '90d') return daysFromNowISO(-90)
  if (range === 'ytd') return `${new Date().getFullYear()}-01-01`
  return null
}

const matchesSearch = (invoice: Invoice, search: string) => {
  const query = search.trim().toLowerCase()
  if (!query) return true
  return [invoice.number, invoice.customer, invoice.email].some((field) =>
    field.toLowerCase().includes(query),
  )
}

export async function fetchInvoices(query: InvoiceQuery, signal?: AbortSignal): Promise<InvoicePage> {
  await delay(250 + Math.random() * 350, signal)

  const since = issuedSince(query.issued)
  const searched = sampleInvoices.filter(
    (invoice) => matchesSearch(invoice, query.search) && (since === null || invoice.issueDate >= since),
  )

  const statusCounts = Object.fromEntries(
    invoiceStatuses.map(({ id }) => [id, searched.filter((i) => i.status === id).length]),
  ) as Record<InvoiceStatus, number>

  const matching =
    query.statuses.length === 0
      ? searched
      : searched.filter((invoice) => query.statuses.includes(invoice.status))

  const { key, direction } = query.sort
  const sign = direction === 'asc' ? 1 : -1
  const sorted = [...matching].sort(
    (a, b) => sign * compareValues(a[key], b[key]) || a.id - b.id,
  )

  // Keyset pagination: start right after the row the cursor points at.
  let start = 0
  const cursor = query.cursor ? decodeCursor(query.cursor) : null
  if (cursor && cursor.key === key && cursor.direction === direction) {
    const index = sorted.findIndex((invoice) => {
      const comparison = sign * compareValues(invoice[key], cursor.value)
      return comparison > 0 || (comparison === 0 && invoice.id > cursor.id)
    })
    start = index === -1 ? sorted.length : index
  }

  const items = sorted.slice(start, start + query.limit)
  const last = items[items.length - 1]
  const hasMore = start + query.limit < sorted.length

  return {
    items,
    nextCursor:
      hasMore && last ? encodeCursor({ key, direction, value: last[key], id: last.id }) : null,
    totalCount: sorted.length,
    totalAmount: sorted.reduce((total, invoice) => total + invoice.amount, 0),
    statusCounts,
  }
}
