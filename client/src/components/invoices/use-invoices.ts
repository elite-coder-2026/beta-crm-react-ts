import { useEffect, useState } from 'react'
import { useDebouncedValue } from '../../hooks/use-debounced-value'
import { fetchInvoices } from './invoice-api'
import type { InvoicePage, InvoiceSort, InvoiceSortKey, InvoiceStatus, IssuedRange } from './invoice-types'

const SEARCH_DEBOUNCE_MS = 300

export function useInvoices(initialPageSize = 10) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS)
  const [statuses, setStatuses] = useState<InvoiceStatus[]>([])
  const [issued, setIssued] = useState<IssuedRange>('all')
  const [sort, setSort] = useState<InvoiceSort>({ key: 'issueDate', direction: 'desc' })
  const [pageSize, setPageSize] = useState(initialPageSize)

  // One cursor per page visited; the last one is the current page. `null` is page 1.
  const [cursors, setCursors] = useState<(string | null)[]>([null])
  const [page, setPage] = useState<InvoicePage | null>(null)
  // Row offset of the page on screen, so "Showing 11–20" matches the rows shown while the next loads.
  const [pageOffset, setPageOffset] = useState(0)
  const [error, setError] = useState<string | null>(null)
  // The request whose result (or error) is on screen. Loading = asking for something else.
  const [settledKey, setSettledKey] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Any change to what we're asking for starts again from page 1.
  const queryKey = JSON.stringify([debouncedSearch, statuses, issued, sort, pageSize])
  const [previousQueryKey, setPreviousQueryKey] = useState(queryKey)
  if (queryKey !== previousQueryKey) {
    setPreviousQueryKey(queryKey)
    setCursors([null])
  }

  const cursor = cursors[cursors.length - 1]
  const pageIndex = cursors.length - 1
  const requestKey = `${queryKey}|${cursor}|${retryCount}`

  useEffect(() => {
    const controller = new AbortController()

    fetchInvoices(
      { search: debouncedSearch, statuses, issued, sort, limit: pageSize, cursor },
      controller.signal,
    )
      .then((result) => {
        setPage(result)
        setPageOffset(pageIndex * pageSize)
        setError(null)
        setSettledKey(requestKey)
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return
        setError(reason instanceof Error ? reason.message : 'Could not load invoices')
        setSettledKey(requestKey)
      })

    // A newer request replaces this one, so its result must never land.
    return () => controller.abort()
  }, [debouncedSearch, statuses, issued, sort, pageSize, cursor, pageIndex, requestKey])

  const nextCursor = page?.nextCursor ?? null

  return {
    // Query
    search,
    statuses,
    issued,
    sort,
    pageSize,

    // Results
    page,
    pageOffset,
    isLoading: settledKey !== requestKey || search !== debouncedSearch,
    error,
    pageIndex,
    hasPrevious: pageIndex > 0,
    hasNext: nextCursor !== null,

    // Actions
    setSearch,
    setIssued,
    setPageSize,
    toggleStatus: (status: InvoiceStatus) =>
      setStatuses((current) =>
        current.includes(status) ? current.filter((s) => s !== status) : [...current, status],
      ),
    clearStatuses: () => setStatuses([]),
    toggleSort: (key: InvoiceSortKey) =>
      setSort((current) =>
        current.key === key
          ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
          : { key, direction: 'desc' },
      ),
    clearFilters: () => {
      setSearch('')
      setStatuses([])
      setIssued('all')
    },
    goToNextPage: () => {
      if (nextCursor) setCursors((current) => [...current, nextCursor])
    },
    goToPreviousPage: () =>
      setCursors((current) => (current.length > 1 ? current.slice(0, -1) : current)),
    retry: () => setRetryCount((count) => count + 1),
  }
}
