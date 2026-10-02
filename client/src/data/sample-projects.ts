import type { Project } from '../components/projects/project-types'
import { daysFromNowISO } from '../utils/dates'
import { sampleKanbanBoard } from './sample-kanban'

export const sampleProjects: Project[] = [
  {
    id: 'sales-pipeline',
    name: 'Sales pipeline',
    description: 'Deals, follow-ups and account work for the sales team.',
    color: 'var(--color-accent)',
    board: sampleKanbanBoard,
  },
  {
    id: 'website-redesign',
    name: 'Website redesign',
    description: 'New marketing site with updated pricing and case studies.',
    color: 'var(--color-info)',
    board: {
      columns: [
        { id: 'web-backlog', title: 'Backlog', color: 'var(--color-neutral)', cardIds: ['w1'] },
        { id: 'web-progress', title: 'In progress', color: 'var(--color-info)', cardIds: ['w2'] },
        {
          id: 'web-done',
          title: 'Done',
          color: 'var(--color-success)',
          isDone: true,
          cardIds: ['w3'],
        },
      ],
      cards: {
        w1: {
          id: 'w1',
          title: 'Write case study copy',
          description: 'Two customer stories for the new site.',
          priority: 'medium',
          assigneeId: 4,
          dueDate: daysFromNowISO(8),
          tags: ['Content'],
        },
        w2: {
          id: 'w2',
          title: 'Build pricing page',
          description: '',
          priority: 'high',
          assigneeId: 1,
          dueDate: daysFromNowISO(4),
          tags: ['Design', 'Dev'],
        },
        w3: {
          id: 'w3',
          title: 'Approve homepage design',
          description: '',
          priority: 'medium',
          assigneeId: 1,
          dueDate: daysFromNowISO(-2),
          tags: ['Design'],
        },
      },
    },
  },
  {
    id: 'customer-onboarding',
    name: 'Customer onboarding',
    description: 'Getting new accounts set up and trained.',
    color: 'var(--color-success)',
    board: {
      columns: [
        { id: 'onb-todo', title: 'To do', color: 'var(--color-neutral)', cardIds: ['o1', 'o2'] },
        { id: 'onb-progress', title: 'In progress', color: 'var(--color-info)', cardIds: [] },
        {
          id: 'onb-done',
          title: 'Done',
          color: 'var(--color-success)',
          isDone: true,
          cardIds: [],
        },
      ],
      cards: {
        o1: {
          id: 'o1',
          title: 'Schedule kick-off with Globex',
          description: '',
          priority: 'high',
          assigneeId: 2,
          dueDate: daysFromNowISO(1),
          tags: ['Onboarding'],
        },
        o2: {
          id: 'o2',
          title: 'Create training videos',
          description: 'Short walkthroughs of the main CRM screens.',
          priority: 'low',
          assigneeId: 3,
          dueDate: null,
          tags: ['Training'],
        },
      },
    },
  },
]
