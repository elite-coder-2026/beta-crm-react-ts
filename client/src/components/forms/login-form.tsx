import { useState, type FormEvent } from 'react'
import PrimaryButton from '../buttons/primary-button'
import {
  Alert,
  Card,
  Checkbox,
  CheckboxLabel,
  Field,
  FooterText,
  Form,
  FormHeader,
  FormSubtitle,
  FormTitle,
  FullWidthSubmit,
  Input,
  Label,
  LabelRow,
  LinkButton,
} from './form.styles'

export interface LoginValues {
  email: string
  password: string
  remember: boolean
}

interface LoginFormProps {
  onSubmit?: (values: LoginValues) => void
  onForgotPassword?: () => void
  onRegister?: () => void
}

function LoginForm({ onSubmit, onForgotPassword, onRegister }: LoginFormProps) {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '', remember: false })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({ ...values, email: values.email.trim() })
    setSubmitted(true)
  }

  return (
    <Card>
      <FormHeader>
        <FormTitle>Sign in</FormTitle>
        <FormSubtitle>Welcome back. Enter your details to continue.</FormSubtitle>
      </FormHeader>

      {submitted && <Alert $variant="success">Signed in as {values.email}.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            required
          />
        </Field>

        <Field>
          <LabelRow>
            <Label htmlFor="login-password">Password</Label>
            {onForgotPassword && (
              <LinkButton type="button" onClick={onForgotPassword}>
                Forgot password?
              </LinkButton>
            )}
          </LabelRow>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(event) => setValues({ ...values, password: event.target.value })}
            required
          />
        </Field>

        <CheckboxLabel>
          <Checkbox
            checked={values.remember}
            onChange={(event) => setValues({ ...values, remember: event.target.checked })}
          />
          Remember me
        </CheckboxLabel>

        <FullWidthSubmit>
          <PrimaryButton type="submit">Sign in</PrimaryButton>
        </FullWidthSubmit>
      </Form>

      {onRegister && (
        <FooterText>
          Don&apos;t have an account?{' '}
          <LinkButton type="button" onClick={onRegister}>
            Register
          </LinkButton>
        </FooterText>
      )}
    </Card>
  )
}

export default LoginForm
