import { createContext, useContext } from 'react'
import type { ToastOptions } from './toast-types'

export interface ToastContextValue {
  toast: (options: ToastOptions) => number
  dismissToast: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider')
  }
  return context
}
