import { useEffect, useRef, useState } from 'react'
import { AlertCircleIcon, CheckCircleIcon, CloseIcon, InfoIcon, WarningIcon } from '../../icons'
import type { NotificationVariant } from './notification-types'
import {
  Card,
  CloseButton,
  Content,
  IconWrap,
  Message,
  Progress,
  Title,
} from './notification.styles'

const variantIcons = {
  success: CheckCircleIcon,
  error: AlertCircleIcon,
  info: InfoIcon,
  warning: WarningIcon,
}

interface NotificationProps {
  variant?: NotificationVariant
  title: string
  message?: string
  /** Auto-dismiss after this many ms. 0 keeps it open until closed. */
  duration?: number
  onClose?: () => void
}

function Notification({
  variant = 'info',
  title,
  message,
  duration = 0,
  onClose,
}: NotificationProps) {
  const [paused, setPaused] = useState(false)
  const remaining = useRef(duration)
  const startedAt = useRef(0)

  useEffect(() => {
    if (!duration || !onClose || paused) return

    startedAt.current = Date.now()
    const timer = window.setTimeout(onClose, remaining.current)

    return () => {
      window.clearTimeout(timer)
      remaining.current -= Date.now() - startedAt.current
    }
  }, [duration, onClose, paused])

  const Icon = variantIcons[variant]

  return (
    <Card
      $variant={variant}
      role={variant === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <IconWrap $variant={variant}>
        <Icon />
      </IconWrap>
      <Content>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
      </Content>
      {onClose && (
        <CloseButton type="button" aria-label="Dismiss notification" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}
      {duration > 0 && onClose && (
        <Progress $variant={variant} $duration={duration} $paused={paused} />
      )}
    </Card>
  )
}

export default Notification
