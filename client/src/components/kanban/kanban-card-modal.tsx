import { useEffect, useState, type FormEvent } from 'react'
import type { Member } from '../members-list'
import {
  kanbanPriorities,
  type KanbanCardData,
  type KanbanColumnData,
  type KanbanPriority,
} from './kanban-types'
import PrimaryButton from '../buttons/primary-button'
import SecondaryButton from '../buttons/secondary-button'
import ErrorButton from '../buttons/error-button'
import { CloseIcon, TrashIcon } from '../../icons'
import { Field, FieldRow, Hint, Input, Label, Select, Textarea } from '../forms/form.styles'
import {
  CloseButton,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogForm,
  DialogHeader,
  DialogTitle,
  FooterActions,
  Overlay,
} from './kanban-card-modal.styles'

interface KanbanCardModalProps {
  card: KanbanCardData
  columnId: string
  columns: KanbanColumnData[]
  members: Member[]
  onSave: (card: KanbanCardData, columnId: string) => void
  onDelete: (cardId: string) => void
  onClose: () => void
}

function KanbanCardModal({
  card,
  columnId,
  columns,
  members,
  onSave,
  onDelete,
  onClose,
}: KanbanCardModalProps) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)
  const [status, setStatus] = useState(columnId)
  const [priority, setPriority] = useState<KanbanPriority>(card.priority)
  const [assigneeId, setAssigneeId] = useState(card.assigneeId?.toString() ?? '')
  const [dueDate, setDueDate] = useState(card.dueDate ?? '')
  const [tags, setTags] = useState(card.tags.join(', '))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(
      {
        ...card,
        title: title.trim(),
        description: description.trim(),
        priority,
        assigneeId: assigneeId === '' ? null : Number(assigneeId),
        dueDate: dueDate || null,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
      status,
    )
  }

  return (
    <Overlay onClick={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="kanban-card-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle id="kanban-card-modal-title">Edit card</DialogTitle>
          <CloseButton type="button" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </DialogHeader>

        <DialogForm onSubmit={handleSubmit}>
          <DialogBody>
            <Field>
              <Label htmlFor="kanban-card-title">Title</Label>
              <Input
                id="kanban-card-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                autoFocus
              />
            </Field>

            <Field>
              <Label htmlFor="kanban-card-description">Description</Label>
              <Textarea
                id="kanban-card-description"
                placeholder="Add more detail…"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Field>

            <FieldRow>
              <Field>
                <Label htmlFor="kanban-card-status">Status</Label>
                <Select
                  id="kanban-card-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label htmlFor="kanban-card-priority">Priority</Label>
                <Select
                  id="kanban-card-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value as KanbanPriority)}
                >
                  {kanbanPriorities.map((option) => (
                    <option key={option} value={option}>
                      {option[0].toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </Select>
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <Label htmlFor="kanban-card-assignee">Assignee</Label>
                <Select
                  id="kanban-card-assignee"
                  value={assigneeId}
                  onChange={(event) => setAssigneeId(event.target.value)}
                >
                  <option value="">Unassigned</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label htmlFor="kanban-card-due-date">Due date</Label>
                <Input
                  id="kanban-card-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </Field>
            </FieldRow>

            <Field>
              <Label htmlFor="kanban-card-tags">Tags</Label>
              <Input
                id="kanban-card-tags"
                placeholder="Sales, Follow-up"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              />
              <Hint>Separate tags with commas.</Hint>
            </Field>
          </DialogBody>

          <DialogFooter>
            <ErrorButton onClick={() => onDelete(card.id)}>
              <TrashIcon />
              Delete
            </ErrorButton>
            <FooterActions>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <PrimaryButton type="submit">Save changes</PrimaryButton>
            </FooterActions>
          </DialogFooter>
        </DialogForm>
      </Dialog>
    </Overlay>
  )
}

export default KanbanCardModal
