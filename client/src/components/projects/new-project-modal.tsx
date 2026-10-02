import { useEffect, useState, type FormEvent } from 'react'
import type { NewProjectValues, ProjectTemplateId } from './project-types'
import { projectColors, projectTemplates } from './project-templates'
import PrimaryButton from '../buttons/primary-button'
import SecondaryButton from '../buttons/secondary-button'
import { CloseIcon } from '../../icons'
import { Field, Input, Label, Textarea } from '../forms/form.styles'
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
} from '../kanban/kanban-card-modal.styles'
import {
  ColumnChip,
  Fieldset,
  Legend,
  Swatch,
  Swatches,
  TemplateColumns,
  TemplateDescription,
  TemplateName,
  TemplateOption,
  Templates,
  VisuallyHidden,
} from './new-project-modal.styles'

interface NewProjectModalProps {
  onCreate: (values: NewProjectValues) => void
  onClose: () => void
}

function NewProjectModal({ onCreate, onClose }: NewProjectModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(projectColors[0])
  const [templateId, setTemplateId] = useState<ProjectTemplateId>('basic')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    onCreate({ name: name.trim(), description: description.trim(), color, templateId })
  }

  return (
    <Overlay onClick={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle id="new-project-title">New project</DialogTitle>
          <CloseButton type="button" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </DialogHeader>

        <DialogForm onSubmit={handleSubmit}>
          <DialogBody>
            <Field>
              <Label htmlFor="new-project-name">Project name</Label>
              <Input
                id="new-project-name"
                placeholder="e.g. Website redesign"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />
            </Field>

            <Field>
              <Label htmlFor="new-project-description">Description</Label>
              <Textarea
                id="new-project-description"
                placeholder="What is this project about?"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Field>

            <Fieldset>
              <Legend>Color</Legend>
              <Swatches>
                {projectColors.map((option) => (
                  <Swatch key={option} $color={option} $selected={option === color}>
                    <VisuallyHidden
                      type="radio"
                      name="project-color"
                      value={option}
                      checked={option === color}
                      onChange={() => setColor(option)}
                      aria-label={option.replace(/var\(--color-|\)/g, '')}
                    />
                  </Swatch>
                ))}
              </Swatches>
            </Fieldset>

            <Fieldset>
              <Legend>Template</Legend>
              <Templates>
                {projectTemplates.map((template) => (
                  <TemplateOption key={template.id} $selected={template.id === templateId}>
                    <VisuallyHidden
                      type="radio"
                      name="project-template"
                      value={template.id}
                      checked={template.id === templateId}
                      onChange={() => setTemplateId(template.id)}
                    />
                    <TemplateName>{template.name}</TemplateName>
                    <TemplateDescription>{template.description}</TemplateDescription>
                    {template.columns.length > 0 && (
                      <TemplateColumns>
                        {template.columns.map((column) => (
                          <ColumnChip key={column.title}>{column.title}</ColumnChip>
                        ))}
                      </TemplateColumns>
                    )}
                  </TemplateOption>
                ))}
              </Templates>
            </Fieldset>
          </DialogBody>

          <DialogFooter>
            <span />
            <FooterActions>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <PrimaryButton type="submit" disabled={!name.trim()}>
                Create project
              </PrimaryButton>
            </FooterActions>
          </DialogFooter>
        </DialogForm>
      </Dialog>
    </Overlay>
  )
}

export default NewProjectModal
