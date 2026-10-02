import { useEffect, useRef, useState } from 'react'
import { AlertCircleIcon, CheckCircleIcon, CloseIcon, InfoIcon } from '../../icons'
import type { ToastAction, ToastVariant } from './toast-types'
import { ActionButton, Bar, CloseButton, IconWrap, Message } from './toast.styles'

const variantIcons = {
  default: InfoIcon,
  success: CheckCircleIcon,
  error: AlertCircleIcon,
}

interface ToastProps {
  message: string
  variant?: ToastVariant
  action?: ToastAction
  /** Auto-dismiss after this many ms. 0 keeps it open until closed. */
  duration?: number
  onClose?: () => void
}

function Toast({ message, variant = 'default', action, duration = 0, onClose }: ToastProps) {
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

  const handleAction = () => {
    action?.onClick()
    onClose?.()
  }

  return (
    <Bar
      role={variant === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <IconWrap $variant={variant}>
        <Icon />
      </IconWrap>
      <Message>{message}</Message>
      {action && (
        <ActionButton type="button" onClick={handleAction}>
          {action.label}
        </ActionButton>
      )}
      {onClose && (
        <CloseButton type="button" aria-label="Dismiss" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}
    </Bar>
  )
}

export default Toast
