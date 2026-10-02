import { useState, type FormEvent } from 'react'
import PrimaryButton from '../buttons/primary-button'
import {
  Alert,
  Card,
  Checkbox,
  CheckboxLabel,
  ErrorText,
  Field,
  FieldRow,
  FooterText,
  Form,
  FormHeader,
  FormSubtitle,
  FormTitle,
  FullWidthSubmit,
  Hint,
  Input,
  Label,
  LinkButton,
} from './form.styles'

export interface RegisterValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface RegisterFormProps {
  onSubmit?: (values: RegisterValues) => void
  onLogin?: () => void
}

const MIN_PASSWORD_LENGTH = 8

function RegisterForm({ onSubmit, onLogin }: RegisterFormProps) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [showErrors, setShowErrors] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const passwordTooShort = values.password.length < MIN_PASSWORD_LENGTH
  const passwordsMismatch = values.password !== values.confirmPassword

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passwordTooShort || passwordsMismatch) {
      setShowErrors(true)
      return
    }

    onSubmit?.({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
    })
    setShowErrors(false)
    setSubmitted(true)
  }

  return (
    <Card>
      <FormHeader>
        <FormTitle>Create an account</FormTitle>
        <FormSubtitle>Get started with Beta CRM in under a minute.</FormSubtitle>
      </FormHeader>

      {submitted && <Alert $variant="success">Account created for {values.email}.</Alert>}

      <Form onSubmit={handleSubmit}>
        <FieldRow>
          <Field>
            <Label htmlFor="register-first-name">First name</Label>
            <Input
              id="register-first-name"
              autoComplete="given-name"
              value={values.firstName}
              onChange={(event) => setValues({ ...values, firstName: event.target.value })}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="register-last-name">Last name</Label>
            <Input
              id="register-last-name"
              autoComplete="family-name"
              value={values.lastName}
              onChange={(event) => setValues({ ...values, lastName: event.target.value })}
              required
            />
          </Field>
        </FieldRow>

        <Field>
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            aria-invalid={showErrors && passwordTooShort}
            onChange={(event) => setValues({ ...values, password: event.target.value })}
            required
          />
          {showErrors && passwordTooShort ? (
            <ErrorText>Password must be at least {MIN_PASSWORD_LENGTH} characters.</ErrorText>
          ) : (
            <Hint>At least {MIN_PASSWORD_LENGTH} characters.</Hint>
          )}
        </Field>

        <Field>
          <Label htmlFor="register-confirm-password">Confirm password</Label>
          <Input
            id="register-confirm-password"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            aria-invalid={showErrors && passwordsMismatch}
            onChange={(event) => setValues({ ...values, confirmPassword: event.target.value })}
            required
          />
          {showErrors && passwordsMismatch && <ErrorText>Passwords don&apos;t match.</ErrorText>}
        </Field>

        <CheckboxLabel>
          <Checkbox
            checked={values.acceptTerms}
            onChange={(event) => setValues({ ...values, acceptTerms: event.target.checked })}
            required
          />
          I agree to the terms and privacy policy
        </CheckboxLabel>

        <FullWidthSubmit>
          <PrimaryButton type="submit">Create account</PrimaryButton>
        </FullWidthSubmit>
      </Form>

      {onLogin && (
        <FooterText>
          Already have an account?{' '}
          <LinkButton type="button" onClick={onLogin}>
            Sign in
          </LinkButton>
        </FooterText>
      )}
    </Card>
  )
}

export default RegisterForm
