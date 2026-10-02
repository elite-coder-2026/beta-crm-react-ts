import { useState, type FormEvent } from 'react'
import PrimaryButton from '../buttons/primary-button'
import {
  Alert,
  Card,
  Field,
  FooterText,
  Form,
  FormHeader,
  FormSubtitle,
  FormTitle,
  FullWidthSubmit,
  Input,
  Label,
  LinkButton,
} from './form.styles'

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void
  onBackToLogin?: () => void
}

function ForgotPasswordForm({ onSubmit, onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(email.trim())
    setSubmitted(true)
  }

  return (
    <Card>
      <FormHeader>
        <FormTitle>Forgot your password?</FormTitle>
        <FormSubtitle>Enter your email and we&apos;ll send you a reset link.</FormSubtitle>
      </FormHeader>

      {submitted && (
        <Alert $variant="success">
          If an account exists for {email}, a reset link is on its way.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="forgot-email">Email</Label>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>

        <FullWidthSubmit>
          <PrimaryButton type="submit">Send reset link</PrimaryButton>
        </FullWidthSubmit>
      </Form>

      {onBackToLogin && (
        <FooterText>
          <LinkButton type="button" onClick={onBackToLogin}>
            Back to sign in
          </LinkButton>
        </FooterText>
      )}
    </Card>
  )
}

export default ForgotPasswordForm
