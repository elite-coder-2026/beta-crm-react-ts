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
  width: 100%;
  max-width: 440px;
  padding: 24px;
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
`

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
`

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  font-size: 14px;
  font-weight: 400;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const Select = styled(Input).attrs({ as: 'select' })``

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`

export const CancelButton = styled.button`
  padding: 10px 18px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: var(--color-hover);
  }
`
