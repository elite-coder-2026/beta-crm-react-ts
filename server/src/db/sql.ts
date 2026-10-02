/**
 * Turns the fields that were sent into columns, `col = $n` assignments and values
 * for INSERT/UPDATE. Column names come only from `columns`; every value is a parameter.
 */
export function toColumns(fields: Record<string, unknown>, columns: Record<string, string>) {
  const names: string[] = []
  const values: unknown[] = []

  for (const [field, value] of Object.entries(fields)) {
    const column = columns[field]
    if (column === undefined) continue
    names.push(column)
    values.push(value)
  }

  return {
    columns: names,
    placeholders: values.map((_, index) => `$${index + 1}`),
    assignments: names.map((column, index) => `${column} = $${index + 1}`),
    values,
  }
}
