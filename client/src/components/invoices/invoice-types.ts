export type InvoiceStatus = 'draft' | 'sent' | 'overdue' | 'paid' | 'void'

export const invoiceStatuses: { id: InvoiceStatus; label: string }[] = [
  { id: 'draft', label: 'Draft' },
  { id: 'sent', label: 'Sent' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'paid', label: 'Paid' },
  { id: 'void', label: 'Void' },
]

export interface Invoice {
  id: number
  number: string
  customer: string
  email: string
  amount: number
  status: InvoiceStatus
  /** ISO dates, e.g. 2026-10-02 */
  issueDate: string
  dueDate: string
}

export type InvoiceSortKey = 'issueDate' | 'dueDate' | 'amount'
export type SortDirection = 'asc' | 'desc'

export interface InvoiceSort {
  key: InvoiceSortKey
  direction: SortDirection
}

export type IssuedRange = 'all' | '30d' | '90d' | 'ytd'

export const issuedRanges: { id: IssuedRange; label: string }[] = [
  { id: 'all', label: 'Any time' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'ytd', label: 'This year' },
]

export interface InvoiceQuery {
  search: string
  statuses: InvoiceStatus[]
  issued: IssuedRange
  sort: InvoiceSort
  limit: number
  /** Opaque cursor from a previous page's nextCursor; null for the first page. */
  cursor: string | null
}

export interface InvoicePage {
  items: Invoice[]
  nextCursor: string | null
  /** Matches for the current search, date and status filters. */
  totalCount: number
  totalAmount: number
  /** Matches per status for the current search and date filters, ignoring the status filter. */
  statusCounts: Record<InvoiceStatus, number>
}
