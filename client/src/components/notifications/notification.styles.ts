import styled, { keyframes } from 'styled-components'
import type { NotificationVariant } from './notification-types'

const variantColors: Record<NotificationVariant, { color: string; background: string }> = {
  success: { color: 'var(--color-success)', background: 'var(--color-success-bg)' },
  error: { color: 'var(--color-danger)', background: 'var(--color-danger-bg)' },
  info: { color: 'var(--color-info)', background: 'var(--color-info-bg)' },
  warning: { color: 'var(--color-warning)', background: 'var(--color-warning-bg)' },
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const shrink = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
`

export const Stack = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: calc(100% - 32px);
  max-width: 380px;
  pointer-events: none;
`

export const Card = styled.div<{ $variant: NotificationVariant }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 14px 14px 16px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid ${({ $variant }) => variantColors[$variant].color};
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
  animation: ${slideIn} 0.2s ease;
`

export const IconWrap = styled.div<{ $variant: NotificationVariant }>`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $variant }) => variantColors[$variant].background};
  color: ${({ $variant }) => variantColors[$variant].color};
`

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 5px;
`

export const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`

export const Message = styled.p`
  margin-top: 2px;
  font-size: 13px;
  color: var(--color-text-muted);
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
  color: var(--color-text-muted);
  cursor: pointer;

  &:hover {
    background: var(--color-hover);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const Progress = styled.div<{ $variant: NotificationVariant; $duration: number; $paused: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: ${({ $variant }) => variantColors[$variant].color};
  opacity: 0.4;
  transform-origin: left;
  animation: ${shrink} ${({ $duration }) => $duration}ms linear forwards;
  animation-play-state: ${({ $paused }) => ($paused ? 'paused' : 'running')};
`
