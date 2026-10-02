import type { ButtonHTMLAttributes } from 'react'
import { SuccessStyledButton } from './button.styles'

type SuccessButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function SuccessButton({ type = 'button', children, ...props }: SuccessButtonProps) {
  return (
    <SuccessStyledButton type={type} {...props}>
      {children}
    </SuccessStyledButton>
  )
}

export default SuccessButton
