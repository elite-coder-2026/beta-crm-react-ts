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

function BasicTable<T extends { id: number | string }>({
  columns,
  rows,
  selectable = false,
  onView,
  onEdit,
  onRemove,
}: TableProps<T>) {
  const hasActions = Boolean(onView || onEdit || onRemove)

  const { allSelected, isSelected, toggle, toggleAll, headerCheckboxRef } = useRowSelection(
    rows.map((row) => row.id),
  )

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <Th key={column.key}>
                {selectable && index === 0 ? (
                  <CheckboxCell>
                    <Checkbox
                      ref={headerCheckboxRef}
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all rows"
                    />
                    {column.header}
                  </CheckboxCell>
                ) : (
                  column.header
                )}
              </Th>
            ))}
            {hasActions && <Th>Actions</Th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
