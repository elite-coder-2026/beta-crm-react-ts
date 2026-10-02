import type { ButtonHTMLAttributes } from 'react'
import { ErrorStyledButton } from './button.styles'

type ErrorButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function ErrorButton({ type = 'button', children, ...props }: ErrorButtonProps) {
  return (
    <ErrorStyledButton type={type} {...props}>
      {children}
    </ErrorStyledButton>
  )
}

export default ErrorButton
