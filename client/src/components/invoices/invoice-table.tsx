import type { ReactNode } from 'react'
import { useInvoices } from './use-invoices'
import {
  invoiceStatuses,
  issuedRanges,
  type Invoice,
  type InvoiceSortKey,
  type IssuedRange,
} from './invoice-types'
import SecondaryButton from '../buttons/secondary-button'
import { Table, TableContainer, Td, Th } from '../basic-table.styles'
import { SortButton, SortIcon } from '../sortable-table.styles'
import { FilterSelect, SearchField, SearchInput } from '../kanban/kanban-board.styles'
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '../../icons'
import { formatShortDate, todayISO } from '../../utils/dates'
import {
  Body,
  Chip,
  ChipCount,
  Chips,
  Footer,
  Header,
  InvoiceNumber,
  LoadingBar,
  MessageActions,
  MessageCell,
  Muted,
  OverdueNote,
  PageButton,
  PageButtons,
  PageSizeLabel,
  Pager,
  RightTd,
  RightTh,
  Stack,
  StatusBadge,
  Summary,
  TablePanel,
  Title,
  Toolbar,
  Wrapper,
} from './invoice-table.styles'

const PAGE_SIZES = [10, 25, 50]
const COLUMN_COUNT = 6
const DAY = 24 * 60 * 60 * 1000

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const daysBetween = (fromISO: string, toISO: string) =>
  Math.round((Date.parse(toISO) - Date.parse(fromISO)) / DAY)

const fullDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function InvoiceTable() {
  const invoices = useInvoices()
  const { page, pageOffset, isLoading, error, sort, pageIndex, pageSize } = invoices
  const today = todayISO()

  const hasFilters =
    invoices.search !== '' || invoices.statuses.length > 0 || invoices.issued !== 'all'
  const allCount = page
    ? Object.values(page.statusCounts).reduce((total, count) => total + count, 0)
    : null

  const firstRow = pageOffset + 1
  const lastRow = pageOffset + (page?.items.length ?? 0)

  const sortableHeader = (key: InvoiceSortKey, label: string, HeaderCell = Th) => {
    const isActive = sort.key === key
    return (
      <HeaderCell
        aria-sort={isActive ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <SortButton type="button" $active={isActive} onClick={() => invoices.toggleSort(key)}>
          {label}
          <SortIcon $active={isActive} aria-hidden="true">
            {isActive && sort.direction === 'asc' ? '▲' : '▼'}
          </SortIcon>
        </SortButton>
      </HeaderCell>
    )
  }

  const renderDueDate = (invoice: Invoice) => {
    const overdueDays = daysBetween(invoice.dueDate, today)
    return (
      <Stack>
        <span title={fullDate(invoice.dueDate)}>{formatShortDate(invoice.dueDate)}</span>
        {invoice.status === 'overdue' && overdueDays > 0 && (
          <OverdueNote>
            {overdueDays} {overdueDays === 1 ? 'day' : 'days'} overdue
          </OverdueNote>
        )}
      </Stack>
    )
  }

  const message = (content: ReactNode) => (
    <tr>
      <MessageCell colSpan={COLUMN_COUNT}>{content}</MessageCell>
    </tr>
  )

  let rows: ReactNode
  if (error) {
    rows = message(
      <>
        Couldn’t load invoices. {error}
        <MessageActions>
          <SecondaryButton onClick={invoices.retry}>Try again</SecondaryButton>
        </MessageActions>
      </>,
    )
  } else if (!page) {
    rows = message('Loading invoices…')
  } else if (page.items.length === 0) {
    rows = message(
      <>
        No invoices match these filters.
        {hasFilters && (
          <MessageActions>
            <SecondaryButton onClick={invoices.clearFilters}>Clear filters</SecondaryButton>
          </MessageActions>
        )}
      </>,
    )
  } else {
    rows = page.items.map((invoice) => (
      <tr key={invoice.id}>
        <Td>
          <InvoiceNumber>{invoice.number}</InvoiceNumber>
        </Td>
        <Td>
          <Stack>
            <span>{invoice.customer}</span>
            <Muted>{invoice.email}</Muted>
          </Stack>
        </Td>
        <Td title={fullDate(invoice.issueDate)}>{formatShortDate(invoice.issueDate)}</Td>
        <Td>{renderDueDate(invoice)}</Td>
        <RightTd>{currency.format(invoice.amount)}</RightTd>
        <Td>
          <StatusBadge $status={invoice.status}>
            {invoiceStatuses.find((s) => s.id === invoice.status)?.label}
          </StatusBadge>
        </Td>
      </tr>
    ))
  }

  return (
    <Wrapper>
      <Header>
        <Title>Invoices</Title>
        {page && (
          <Summary>
            {page.totalCount} {page.totalCount === 1 ? 'invoice' : 'invoices'} ·{' '}
            {currency.format(page.totalAmount)}
          </Summary>
        )}
      </Header>

      <Toolbar>
        <SearchField>
          <SearchIcon />
          <SearchInput
            type="search"
            aria-label="Search invoices"
            placeholder="Search number, customer or email…"
            value={invoices.search}
            onChange={(event) => invoices.setSearch(event.target.value)}
          />
        </SearchField>
        <FilterSelect
          aria-label="Issue date"
          value={invoices.issued}
          onChange={(event) => invoices.setIssued(event.target.value as IssuedRange)}
        >
          {issuedRanges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.id === 'all' ? 'Issued any time' : `Issued ${range.label.toLowerCase()}`}
            </option>
          ))}
        </FilterSelect>
      </Toolbar>

      <Chips role="group" aria-label="Filter by status">
        <Chip
          type="button"
          $active={invoices.statuses.length === 0}
          aria-pressed={invoices.statuses.length === 0}
          onClick={invoices.clearStatuses}
        >
          All
          {allCount !== null && <ChipCount>{allCount}</ChipCount>}
        </Chip>
        {invoiceStatuses.map((status) => {
          const isActive = invoices.statuses.includes(status.id)
          return (
            <Chip
              key={status.id}
              type="button"
              $active={isActive}
              aria-pressed={isActive}
              onClick={() => invoices.toggleStatus(status.id)}
            >
              {status.label}
              {page && <ChipCount>{page.statusCounts[status.id]}</ChipCount>}
            </Chip>
          )
        })}
      </Chips>

      <TablePanel aria-busy={isLoading}>
        {isLoading && <LoadingBar role="progressbar" aria-label="Loading invoices" />}
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Invoice</Th>
                <Th>Customer</Th>
                {sortableHeader('issueDate', 'Issued')}
                {sortableHeader('dueDate', 'Due')}
                {sortableHeader('amount', 'Amount', RightTh)}
                <Th>Status</Th>
              </tr>
            </thead>
            <Body $stale={isLoading && page !== null}>{rows}</Body>
          </Table>
        </TableContainer>
      </TablePanel>

      <Footer>
        <span aria-live="polite">
          {page && page.items.length > 0
            ? `Showing ${firstRow}–${lastRow} of ${page.totalCount}`
            : ' '}
        </span>
        <Pager>
          <PageSizeLabel>
            Rows per page
            <FilterSelect
              value={pageSize}
              onChange={(event) => invoices.setPageSize(Number(event.target.value))}
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </FilterSelect>
          </PageSizeLabel>
          <span>Page {pageIndex + 1}</span>
          <PageButtons>
            <PageButton
              type="button"
              aria-label="Previous page"
              disabled={!invoices.hasPrevious || isLoading}
              onClick={invoices.goToPreviousPage}
            >
              <ChevronLeftIcon />
            </PageButton>
            <PageButton
              type="button"
              aria-label="Next page"
              disabled={!invoices.hasNext || isLoading}
              onClick={invoices.goToNextPage}
            >
              <ChevronRightIcon />
            </PageButton>
          </PageButtons>
        </Pager>
      </Footer>
    </Wrapper>
  )
}

export default InvoiceTable
