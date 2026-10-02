import styled, { keyframes } from 'styled-components'
import type { ToastVariant } from './toast-types'

const iconColors: Record<ToastVariant, string> = {
  default: 'var(--color-toast-muted)',
  success: 'var(--color-toast-success)',
  error: 'var(--color-toast-error)',
}

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

export const Stack = styled.div`
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8px;
  width: calc(100% - 32px);
  max-width: 480px;
  transform: translateX(-50%);
  pointer-events: none;
`

export const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 8px 8px 8px 16px;
  background: var(--color-toast-bg);
  color: var(--color-toast-text);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  font-size: 14px;
  pointer-events: auto;
  animation: ${slideUp} 0.18s ease;
`

export const IconWrap = styled.span<{ $variant: ToastVariant }>`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  color: ${({ $variant }) => iconColors[$variant]};
`

export const Message = styled.span`
  flex: 1;
  min-width: 0;
`

export const ActionButton = styled.button`
  flex-shrink: 0;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-toast-action);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-toast-action);
  }
`

export const CloseButton = styled.button`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-toast-muted);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--color-toast-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-toast-action);
  }
`
