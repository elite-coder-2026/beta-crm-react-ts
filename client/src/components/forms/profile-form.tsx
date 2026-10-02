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

export interface ProfileValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  timezone: string
  bio: string
}

interface ProfileFormProps {
  initialValues?: Partial<ProfileValues>
  onSubmit?: (values: ProfileValues) => void
}

const timezones = ['UTC', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Europe/London']

const emptyProfile: ProfileValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  timezone: 'UTC',
  bio: '',
}

function ProfileForm({ initialValues, onSubmit }: ProfileFormProps) {
  const [values, setValues] = useState<ProfileValues>({ ...emptyProfile, ...initialValues })
  const [saved, setSaved] = useState(false)

  const updateField = (field: keyof ProfileValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(values)
    setSaved(true)
  }

  return (
    <Card $wide>
      <FormHeader>
        <FormTitle>Profile settings</FormTitle>
        <FormSubtitle>Update your personal details and preferences.</FormSubtitle>
      </FormHeader>

      {saved && <Alert $variant="success">Your profile has been saved.</Alert>}

      <Form onSubmit={handleSubmit}>
        <FieldRow>
          <Field>
            <Label htmlFor="profile-first-name">First name</Label>
            <Input
              id="profile-first-name"
              autoComplete="given-name"
              value={values.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="profile-last-name">Last name</Label>
            <Input
              id="profile-last-name"
              autoComplete="family-name"
              value={values.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              required
            />
          </Field>
        </FieldRow>

        <FieldRow>
          <Field>
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="profile-phone">Phone</Label>
            <Input
              id="profile-phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => updateField('phone', event.target.value)}
            />
          </Field>
        </FieldRow>

        <Field>
          <Label htmlFor="profile-timezone">Time zone</Label>
          <Select
            id="profile-timezone"
            value={values.timezone}
            onChange={(event) => updateField('timezone', event.target.value)}
          >
            {timezones.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="profile-bio">Bio</Label>
          <Textarea
            id="profile-bio"
            placeholder="A few words about yourself"
            value={values.bio}
            onChange={(event) => updateField('bio', event.target.value)}
          />
        </Field>

        <SubmitRow>
          <PrimaryButton type="submit">Save changes</PrimaryButton>
        </SubmitRow>
      </Form>
    </Card>
  )
}

export default ProfileForm
