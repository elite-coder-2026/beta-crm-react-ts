import { useState, type FormEvent } from 'react'
import PrimaryButton from '../buttons/primary-button'
import {
  Alert,
  Card,
  Field,
  FieldRow,
  Form,
  FormHeader,
  FormSubtitle,
  FormTitle,
  Input,
  Label,
  Select,
  SubmitRow,
  Textarea,
} from './form.styles'

export interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (values: ContactValues) => void
}

const subjects = ['General question', 'Billing', 'Technical support', 'Feedback']

const emptyContact: ContactValues = { name: '', email: '', subject: subjects[0], message: '' }

function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(emptyContact)
  const [sent, setSent] = useState(false)

  const updateField = (field: keyof ContactValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({ ...values, name: values.name.trim(), email: values.email.trim() })
    setValues(emptyContact)
    setSent(true)
  }

  return (
    <Card $wide>
      <FormHeader>
        <FormTitle>Contact us</FormTitle>
        <FormSubtitle>Send us a message and we&apos;ll get back to you soon.</FormSubtitle>
      </FormHeader>

      {sent && <Alert $variant="success">Thanks! Your message has been sent.</Alert>}

      <Form onSubmit={handleSubmit}>
        <FieldRow>
          <Field>
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
            />
          </Field>
        </FieldRow>

        <Field>
          <Label htmlFor="contact-subject">Subject</Label>
          <Select
            id="contact-subject"
            value={values.subject}
            onChange={(event) => updateField('subject', event.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            required
          />
        </Field>

        <SubmitRow>
          <PrimaryButton type="submit">Send message</PrimaryButton>
        </SubmitRow>
      </Form>
    </Card>
  )
}

export default ContactForm
