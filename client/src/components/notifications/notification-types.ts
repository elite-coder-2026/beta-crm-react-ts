export type NotificationVariant = 'success' | 'error' | 'info' | 'warning'

export interface NotificationOptions {
  variant?: NotificationVariant
  title: string
  message?: string
  duration?: number
}

export interface NotificationItem extends Required<Omit<NotificationOptions, 'message'>> {
  id: number
  message?: string
}
