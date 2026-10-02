import styled from 'styled-components'

export const Card = styled.div<{ $wide?: boolean }>`
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? '600px' : '420px')};
  padding: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);

  @media (max-width: 720px) {
    padding: 24px 20px;
  }
`

export const FormHeader = styled.div`
  margin-bottom: 24px;
`

export const FormTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const FormSubtitle = styled.p`
  margin-top: 6px;
  font-size: 14px;
  color: var(--color-text-muted);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  font-size: 14px;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }

  &[aria-invalid='true'] {
    border-color: var(--color-danger);
  }
`

export const Select = styled(Input).attrs({ as: 'select' })`
  cursor: pointer;
`

export const Textarea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 120px;
  resize: vertical;
`

export const Hint = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

export const ErrorText = styled.span`
  font-size: 12px;
  color: var(--color-danger);
`

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
`

export const LinkButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: none;
    border-radius: 4px;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const SubmitRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  & > button {
    min-width: 140px;
  }
`

export const FullWidthSubmit = styled.div`
  margin-top: 8px;

  & > button {
    width: 100%;
  }
`

export const FooterText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: var(--color-text-muted);
`

export const Alert = styled.div<{ $variant: 'success' | 'error' }>`
  margin-bottom: 16px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ $variant }) =>
    $variant === 'success' ? 'var(--color-success)' : 'var(--color-danger)'};
  background: ${({ $variant }) =>
    $variant === 'success' ? 'var(--color-success-bg)' : 'var(--color-danger-bg)'};
`
