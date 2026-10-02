export type ToastVariant = 'default' | 'success' | 'error'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  message: string
  variant?: ToastVariant
  action?: ToastAction
  duration?: number
}

export interface ToastItem {
  id: number
  message: string
  variant: ToastVariant
  action?: ToastAction
  duration: number
}
