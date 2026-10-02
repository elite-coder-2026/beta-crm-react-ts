import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  background: var(--color-overlay);
  animation: ${fadeIn} 0.15s ease;
`

export const Panel = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  animation: ${slideIn} 0.2s ease;
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
`

export const PanelTitle = styled.h2`
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

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 20px 24px;
  text-align: center;
`

export const LargeAvatar = styled.div`
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  margin-bottom: 4px;
  border-radius: 50%;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: 24px;
  font-weight: 700;
`

export const ProfileName = styled.h3`
  font-size: 20px;
  font-weight: 700;
`

export const Details = styled.dl`
  margin: 0;
  padding: 0 20px;
`

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--color-border-subtle);
`

export const DetailLabel = styled.dt`
  color: var(--color-text-muted);
  font-size: 14px;
`

export const DetailValue = styled.dd`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  word-break: break-word;
`

export const PanelFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 16px 20px;
  border-top: 1px solid var(--color-border);
`
