import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import Toast from './toast'
import { ToastContext } from './toast-context'
import type { ToastItem, ToastOptions } from './toast-types'
import { Stack } from './toast.styles'

const DEFAULT_DURATION = 4000
const MAX_VISIBLE = 3

interface ToastProviderProps {
  children: ReactNode
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismissToast = useCallback(
    (id: number) => setToasts((current) => current.filter((t) => t.id !== id)),
    [],
  )

  const toast = useCallback((options: ToastOptions) => {
    const id = nextId.current++
    const item: ToastItem = {
      id,
      message: options.message,
      variant: options.variant ?? 'default',
      action: options.action,
      duration: options.duration ?? DEFAULT_DURATION,
    }

    setToasts((current) => [...current, item].slice(-MAX_VISIBLE))
    return id
  }, [])

  const value = useMemo(() => ({ toast, dismissToast }), [toast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Stack aria-live="polite">
        {toasts.map((item) => (
          <Toast
            key={item.id}
            message={item.message}
            variant={item.variant}
            action={item.action}
            duration={item.duration}
            onClose={() => dismissToast(item.id)}
          />
        ))}
      </Stack>
    </ToastContext.Provider>
  )
}

export default ToastProvider
