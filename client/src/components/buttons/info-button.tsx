import type { ButtonHTMLAttributes } from 'react'
import { InfoStyledButton } from './button.styles'

type InfoButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function InfoButton({ type = 'button', children, ...props }: InfoButtonProps) {
  return (
    <InfoStyledButton type={type} {...props}>
      {children}
    </InfoStyledButton>
  )
}

export default InfoButton
