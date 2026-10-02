import { useState, type FormEvent } from 'react'
import PrimaryButton from '../buttons/primary-button'
import {
  Alert,
  Card,
  ErrorText,
  Field,
  Form,
  FormHeader,
  FormSubtitle,
  FormTitle,
  FullWidthSubmit,
  Hint,
  Input,
  Label,
} from './form.styles'

interface ResetPasswordFormProps {
  onSubmit?: (password: string) => void
}

const MIN_PASSWORD_LENGTH = 8

function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const passwordTooShort = password.length < MIN_PASSWORD_LENGTH
  const passwordsMismatch = password !== confirmPassword

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passwordTooShort || passwordsMismatch) {
      setShowErrors(true)
      return
    }

    onSubmit?.(password)
    setShowErrors(false)
    setSubmitted(true)
  }

  return (
    <Card>
      <FormHeader>
        <FormTitle>Set a new password</FormTitle>
        <FormSubtitle>Choose a strong password you haven&apos;t used before.</FormSubtitle>
      </FormHeader>

      {submitted && <Alert $variant="success">Your password has been updated.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="reset-password">New password</Label>
          <Input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            value={password}
            aria-invalid={showErrors && passwordTooShort}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {showErrors && passwordTooShort ? (
            <ErrorText>Password must be at least {MIN_PASSWORD_LENGTH} characters.</ErrorText>
          ) : (
            <Hint>At least {MIN_PASSWORD_LENGTH} characters.</Hint>
          )}
        </Field>

        <Field>
          <Label htmlFor="reset-confirm-password">Confirm new password</Label>
          <Input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            aria-invalid={showErrors && passwordsMismatch}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          {showErrors && passwordsMismatch && <ErrorText>Passwords don&apos;t match.</ErrorText>}
        </Field>

        <FullWidthSubmit>
          <PrimaryButton type="submit">Update password</PrimaryButton>
        </FullWidthSubmit>
      </Form>
    </Card>
  )
}

export default ResetPasswordForm
