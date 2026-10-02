import type { ButtonHTMLAttributes } from 'react'
import { PrimaryStyledButton } from './button.styles'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function PrimaryButton({ type = 'button', children, ...props }: PrimaryButtonProps) {
  return (
    <PrimaryStyledButton type={type} {...props}>
      {children}
    </PrimaryStyledButton>
  )
}

export default PrimaryButton
