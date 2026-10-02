import { useMemo, useState } from 'react'
import type { TableProps } from './table-types'
import { useRowSelection } from './use-row-selection'
import { EditIcon, EyeIcon, TrashIcon } from '../icons'
import {
  ActionButton,
  Checkbox,
  CheckboxCell,
  RowActions,
  Table,
  TableContainer,
  Td,
  Th,
} from './basic-table.styles'
import { SortableRow, SortButton, SortIcon } from './sortable-table.styles'

type SortDirection = 'asc' | 'desc'

function SortableTable<T extends { id: number | string }>({
  columns,
  rows,
  selectable = false,
  onView,
  onEdit,
  onRemove,
}: TableProps<T>) {
  const hasActions = Boolean(onView || onEdit || onRemove)

  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [direction, setDirection] = useState<SortDirection>('asc')

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows

    return [...rows].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]
      const result =
        typeof aValue === 'number' && typeof bValue === 'number'
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue))

      return direction === 'asc' ? result : -result
    })
  }, [rows, sortKey, direction])

  const { allSelected, isSelected, toggle, toggleAll, headerCheckboxRef } = useRowSelection(
    rows.map((row) => row.id),
  )

  const handleSort = (key: keyof T) => {
    if (key === sortKey) {
      setDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setDirection('asc')
    }
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {columns.map((column, index) => {
              const isActive = column.key === sortKey
              const sortButton = (
                <SortButton
                  type="button"
                  $active={isActive}
                  onClick={() => handleSort(column.key)}
                >
                  {column.header}
                  <SortIcon $active={isActive} aria-hidden="true">
                    {isActive && direction === 'desc' ? '▼' : '▲'}
                  </SortIcon>
                </SortButton>
              )

              return (
                <Th
                  key={column.key}
                  aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {selectable && index === 0 ? (
                    <CheckboxCell>
                      <Checkbox
                        ref={headerCheckboxRef}
                        checked={allSelected}
                        onChange={toggleAll}
                        aria-label="Select all rows"
                      />
                      {sortButton}
                    </CheckboxCell>
                  ) : (
                    sortButton
                  )}
                </Th>
              )
            })}
            {hasActions && <Th>Actions</Th>}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <SortableRow key={row.id}>
              {columns.map((column, index) => {
                const content = column.render ? column.render(row) : String(row[column.key])

                return (
                  <Td key={column.key}>
                    {selectable && index === 0 ? (
                      <CheckboxCell>
                        <Checkbox
                          checked={isSelected(row.id)}
                          onChange={() => toggle(row.id)}
                          aria-label="Select row"
                        />
                        {content}
                      </CheckboxCell>
                    ) : (
                      content
                    )}
                  </Td>
                )
              })}
              {hasActions && (
                <Td>
                  <RowActions>
                    {onView && (
                      <ActionButton
                        type="button"
                        aria-label="View"
                        title="View"
                        onClick={() => onView(row)}
                      >
                        <EyeIcon />
                      </ActionButton>
                    )}
                    {onEdit && (
                      <ActionButton
                        type="button"
                        aria-label="Edit"
                        title="Edit"
                        onClick={() => onEdit(row)}
                      >
                        <EditIcon />
                      </ActionButton>
                    )}
                    {onRemove && (
                      <ActionButton
                        type="button"
                        $variant="danger"
                        aria-label="Remove"
                        title="Remove"
                        onClick={() => onRemove(row)}
                      >
                        <TrashIcon />
                      </ActionButton>
                    )}
                  </RowActions>
                </Td>
              )}
            </SortableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default SortableTable
