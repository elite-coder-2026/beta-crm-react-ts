import { useEffect, useRef, useState } from 'react'
import type { Project } from './project-types'
import { CheckIcon, ChevronDownIcon, PlusIcon } from '../../icons'
import {
  Divider,
  ItemCount,
  ItemName,
  Menu,
  MenuItem,
  MenuLabel,
  ProjectDot,
  SwitcherRoot,
  Trigger,
} from './project-switcher.styles'

interface ProjectSwitcherProps {
  projects: Project[]
  activeProject: Project
  onSelect: (projectId: string) => void
  onCreate: () => void
}

function ProjectSwitcher({ projects, activeProject, onSelect, onCreate }: ProjectSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const choose = (projectId: string) => {
    onSelect(projectId)
    setIsOpen(false)
  }

  const create = () => {
    onCreate()
    setIsOpen(false)
  }

  return (
    <SwitcherRoot ref={rootRef}>
      <Trigger
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <ProjectDot $color={activeProject.color} $size={12} />
        {activeProject.name}
        <ChevronDownIcon />
      </Trigger>

      {isOpen && (
        <Menu>
          <MenuLabel>Projects</MenuLabel>
          {projects.map((project) => {
            const isActive = project.id === activeProject.id
            const cardCount = Object.keys(project.board.cards).length

            return (
              <MenuItem
                key={project.id}
                type="button"
                $active={isActive}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => choose(project.id)}
              >
                <ProjectDot $color={project.color} />
                <ItemName>{project.name}</ItemName>
                <ItemCount>{cardCount}</ItemCount>
                {isActive && <CheckIcon />}
              </MenuItem>
            )
          })}
          <Divider />
          <MenuItem type="button" onClick={create}>
            <PlusIcon />
            New project
          </MenuItem>
        </Menu>
      )}
    </SwitcherRoot>
  )
}

export default ProjectSwitcher
