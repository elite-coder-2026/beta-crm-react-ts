import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import Notification from './notification'
import { NotificationContext } from './notification-context'
import type { NotificationItem, NotificationOptions } from './notification-types'
import { Stack } from './notification.styles'

const DEFAULT_DURATION = 5000
const MAX_VISIBLE = 5

interface NotificationProviderProps {
  children: ReactNode
}

function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback(
    (id: number) => setNotifications((current) => current.filter((n) => n.id !== id)),
    [],
  )

  const notify = useCallback((options: NotificationOptions) => {
    const id = nextId.current++
    const notification: NotificationItem = {
      id,
      variant: options.variant ?? 'info',
      title: options.title,
      message: options.message,
      duration: options.duration ?? DEFAULT_DURATION,
    }

    setNotifications((current) => [...current, notification].slice(-MAX_VISIBLE))
    return id
  }, [])

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Stack aria-live="polite">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            variant={notification.variant}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={() => dismiss(notification.id)}
          />
        ))}
      </Stack>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
