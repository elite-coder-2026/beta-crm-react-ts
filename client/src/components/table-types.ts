import type { ReactNode } from 'react'

export interface TableColumn<T> {
  key: keyof T & string
  header: string
  render?: (row: T) => ReactNode
}

export interface TableProps<T extends { id: number | string }> {
  columns: TableColumn<T>[]
  rows: T[]
  selectable?: boolean
  onView?: (row: T) => void
  onEdit?: (row: T) => void
  onRemove?: (row: T) => void
}
