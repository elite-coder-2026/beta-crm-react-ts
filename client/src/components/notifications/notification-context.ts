import { createContext, useContext } from 'react'
import type { NotificationOptions } from './notification-types'

export interface NotificationContextValue {
  notify: (options: NotificationOptions) => number
  dismiss: (id: number) => void
}

export const NotificationContext = createContext<NotificationContextValue | null>(null)

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used inside a NotificationProvider')
  }
  return context
}
