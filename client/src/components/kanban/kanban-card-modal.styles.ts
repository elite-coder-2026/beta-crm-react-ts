import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 16px;
  background: var(--color-overlay);
`

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 32px);
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
`

export const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
`

export const DialogTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
`

export const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
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

export const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  overflow-y: auto;
`

export const DialogFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--color-border);
`

export const FooterActions = styled.div`
  display: flex;
  gap: 8px;
`
