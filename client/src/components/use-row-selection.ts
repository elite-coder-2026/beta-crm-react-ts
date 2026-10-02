import { useCallback, useState } from 'react'

export function useRowSelection<Id>(ids: Id[]) {
  const [selected, setSelected] = useState<Set<Id>>(() => new Set())

  const selectedCount = ids.filter((id) => selected.has(id)).length
  const allSelected = ids.length > 0 && selectedCount === ids.length
  const someSelected = selectedCount > 0 && !allSelected

  const isSelected = (id: Id) => selected.has(id)

  const toggle = (id: Id) =>
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(ids))

  const headerCheckboxRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (element) element.indeterminate = someSelected
    },
    [someSelected],
  )

  return { allSelected, isSelected, toggle, toggleAll, headerCheckboxRef }
}
