import type { ButtonHTMLAttributes } from 'react'
import { SecondaryStyledButton } from './button.styles'

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function SecondaryButton({ type = 'button', children, ...props }: SecondaryButtonProps) {
  return (
    <SecondaryStyledButton type={type} {...props}>
      {children}
    </SecondaryStyledButton>
  )
}

export default SecondaryButton
