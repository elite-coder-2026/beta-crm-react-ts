import { useEffect, useState, type FormEvent } from 'react'
import PrimaryButton from './buttons/primary-button'
import type { Member, MemberStatus } from './members-list'
import {
  Actions,
  CancelButton,
  Dialog,
  Field,
  Form,
  Input,
  Overlay,
  Select,
  Title,
} from './add-member-modal.styles'

export type NewMember = Omit<Member, 'id'>

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (member: NewMember) => void
  member?: Member | null
}

const emptyMember: NewMember = { name: '', email: '', role: '', status: 'active' }

const toForm = (member?: Member | null): NewMember =>
  member
    ? { name: member.name, email: member.email, role: member.role, status: member.status }
    : emptyMember

function AddMemberModal({ isOpen, onClose, onSubmit, member }: AddMemberModalProps) {
  const [form, setForm] = useState<NewMember>(() => toForm(member))
  const [wasOpen, setWasOpen] = useState(isOpen)

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) setForm(toForm(member))
  }

  const isEditing = Boolean(member)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const updateField = (field: keyof NewMember, value: string) =>
    setForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
    })
  }

  return (
    <Overlay onClick={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-member-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Title id="add-member-title">{isEditing ? 'Edit member' : 'Add member'}</Title>
        <Form onSubmit={handleSubmit}>
          <Field>
            Name
            <Input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
              autoFocus
            />
          </Field>
          <Field>
            Email
            <Input
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
            />
          </Field>
          <Field>
            Role
            <Input
              value={form.role}
              onChange={(event) => updateField('role', event.target.value)}
              required
            />
          </Field>
          <Field>
            Status
            <Select
              value={form.status}
              onChange={(event) => updateField('status', event.target.value as MemberStatus)}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </Select>
          </Field>
          <Actions>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <PrimaryButton type="submit">{isEditing ? 'Save changes' : 'Add member'}</PrimaryButton>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>
  )
}

export default AddMemberModal
