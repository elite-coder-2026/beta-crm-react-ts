import styled, { css } from 'styled-components'

const baseButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const solidButton = (color: string, hover: string, focusRing: string) => css`
  ${baseButton}
  background: var(${color});
  color: var(--color-on-accent);

  &:hover:not(:disabled) {
    background: var(${hover});
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(${focusRing});
  }
`

export const PrimaryStyledButton = styled.button`
  ${solidButton('--color-accent', '--color-accent-hover', '--color-accent-bg')}
`

export const SecondaryStyledButton = styled.button`
  ${baseButton}
  background: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text);

  &:hover:not(:disabled) {
    background: var(--color-hover);
    border-color: var(--color-text-muted);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const ErrorStyledButton = styled.button`
  ${solidButton('--color-danger', '--color-danger-hover', '--color-danger-bg')}
`

export const SuccessStyledButton = styled.button`
  ${solidButton('--color-success', '--color-success-hover', '--color-success-bg')}
`

export const InfoStyledButton = styled.button`
  ${solidButton('--color-info', '--color-info-hover', '--color-info-bg')}
`
