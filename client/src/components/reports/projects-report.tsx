import type { Member } from '../members-list'
import type { Project } from '../projects/project-types'
import { kanbanPriorities, type KanbanCardData } from '../kanban/kanban-types'
import ChartCard from '../charts/chart-card'
import BarChart from '../charts/bar-chart'
import HorizontalBarChart from '../charts/horizontal-bar-chart'
import StackedBarChart from '../charts/stacked-bar-chart'
import StatTile from '../charts/stat-tile'
import { KpiRow } from '../charts/stat-tile.styles'
import { formatCompact, formatPercent } from '../charts/chart-utils'
import BasicTable from '../basic-table'
import type { TableColumn } from '../table-types'
import { formatShortDate, todayISO } from '../../utils/dates'
import {
  ChartGrid,
  Report,
  ReportHeader,
  ReportSubtitle,
  ReportTitle,
  SectionTitle,
} from './report.styles'

interface ProjectsReportProps {
  projects: Project[]
  members: Member[]
}

type Progress = 'notStarted' | 'inProgress' | 'done'

const progressSeries = [
  { id: 'notStarted', label: 'Not started', color: 'var(--chart-1)' },
  { id: 'inProgress', label: 'In progress', color: 'var(--chart-2)' },
  { id: 'done', label: 'Done', color: 'var(--chart-3)' },
]

const priorityColors = [
  'var(--chart-ramp-1)',
  'var(--chart-ramp-3)',
  'var(--chart-ramp-4)',
  'var(--chart-ramp-5)',
]

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1)

interface TaskEntry {
  card: KanbanCardData
  project: Project
  progress: Progress
}

interface OverdueRow {
  id: string
  task: string
  project: string
  assignee: string
  priority: string
  dueDate: string
}

/** The first non-done column counts as "not started"; other non-done columns as "in progress". */
function collectTasks(projects: Project[]): TaskEntry[] {
  return projects.flatMap((project) => {
    const firstOpenColumn = project.board.columns.find((column) => !column.isDone)

    return project.board.columns.flatMap((column) => {
      const progress: Progress = column.isDone
        ? 'done'
        : column.id === firstOpenColumn?.id
          ? 'notStarted'
          : 'inProgress'
      return column.cardIds
        .map((id) => project.board.cards[id])
        .filter(Boolean)
        .map((card) => ({ card, project, progress }))
    })
  })
}

function ProjectsReport({ projects, members }: ProjectsReportProps) {
  const today = todayISO()
  const memberName = (id: number | null) =>
    id === null ? 'Unassigned' : (members.find((m) => m.id === id)?.name ?? `Member #${id}`)

  const tasks = collectTasks(projects)
  const openTasks = tasks.filter((t) => t.progress !== 'done')
  const doneTasks = tasks.filter((t) => t.progress === 'done')
  const overdue = openTasks
    .filter((t) => t.card.dueDate !== null && t.card.dueDate < today)
    .sort((a, b) => (a.card.dueDate ?? '').localeCompare(b.card.dueDate ?? ''))
  const completion = tasks.length === 0 ? 0 : doneTasks.length / tasks.length

  const progressRows = projects.map((project) => {
    const projectTasks = tasks.filter((t) => t.project.id === project.id)
    const count = (progress: Progress) => projectTasks.filter((t) => t.progress === progress).length
    return {
      label: project.name,
      values: { notStarted: count('notStarted'), inProgress: count('inProgress'), done: count('done') },
    }
  })

  const priorityData = kanbanPriorities.map((priority, index) => {
    const count = openTasks.filter((t) => t.card.priority === priority).length
    return {
      label: capitalize(priority),
      value: count,
      color: priorityColors[index],
      detail: `${formatPercent(openTasks.length === 0 ? 0 : count / openTasks.length)} of open tasks`,
    }
  })

  const assigneeIds = [...new Set(openTasks.map((t) => t.card.assigneeId))]
  const workload = assigneeIds
    .map((id) => {
      const assigned = openTasks.filter((t) => t.card.assigneeId === id)
      const late = assigned.filter((t) => t.card.dueDate !== null && t.card.dueDate < today).length
      return { label: memberName(id), value: assigned.length, overdue: late }
    })
    .sort((a, b) => b.value - a.value)

  const overdueRows: OverdueRow[] = overdue.map(({ card, project }) => ({
    id: `${project.id}-${card.id}`,
    task: card.title,
    project: project.name,
    assignee: memberName(card.assigneeId),
    priority: capitalize(card.priority),
    dueDate: card.dueDate ?? '',
  }))

  const overdueColumns: TableColumn<OverdueRow>[] = [
    { key: 'task', header: 'Task' },
    { key: 'project', header: 'Project' },
    { key: 'assignee', header: 'Assignee' },
    { key: 'priority', header: 'Priority' },
    { key: 'dueDate', header: 'Due', render: (row) => formatShortDate(row.dueDate) },
  ]

  return (
    <Report>
      <ReportHeader>
        <ReportTitle>Projects report</ReportTitle>
        <ReportSubtitle>
          Live from your Kanban boards · {projects.length}{' '}
          {projects.length === 1 ? 'project' : 'projects'}
        </ReportSubtitle>
      </ReportHeader>

      <KpiRow>
        <StatTile label="Projects" value={formatCompact(projects.length)} />
        <StatTile label="Open tasks" value={formatCompact(openTasks.length)} />
        <StatTile label="Overdue tasks" value={formatCompact(overdue.length)} />
        <StatTile label="Completed" value={formatPercent(completion)} />
      </KpiRow>

      <ChartGrid>
        <ChartCard
          span={2}
          title="Progress by project"
          subtitle="Tasks per project, by where they sit on the board"
          legend={progressSeries}
          isEmpty={tasks.length === 0}
          table={{
            columns: ['Project', 'Not started', 'In progress', 'Done', 'Total'],
            rows: progressRows.map((row) => [
              row.label,
              row.values.notStarted,
              row.values.inProgress,
              row.values.done,
              row.values.notStarted + row.values.inProgress + row.values.done,
            ]),
          }}
        >
          <StackedBarChart
            ariaLabel="Tasks per project by progress"
            series={progressSeries}
            rows={progressRows}
          />
        </ChartCard>

        <ChartCard
          title="Open tasks by priority"
          subtitle="Across every project"
          isEmpty={openTasks.length === 0}
          table={{
            columns: ['Priority', 'Open tasks'],
            rows: priorityData.map((d) => [d.label, d.value]),
          }}
        >
          <BarChart
            ariaLabel="Open tasks by priority"
            seriesLabel="Open tasks"
            data={priorityData}
            height={240}
          />
        </ChartCard>

        <ChartCard
          title="Workload by person"
          subtitle="Open tasks assigned to each person"
          isEmpty={workload.length === 0}
          table={{
            columns: ['Person', 'Open tasks', 'Overdue'],
            rows: workload.map((w) => [w.label, w.value, w.overdue]),
          }}
        >
          <HorizontalBarChart
            ariaLabel="Open tasks per person"
            seriesLabel="Open tasks"
            data={workload.map((w) => ({
              label: w.label,
              value: w.value,
              detail: w.overdue > 0 ? `${w.overdue} overdue` : 'Nothing overdue',
            }))}
          />
        </ChartCard>
      </ChartGrid>

      <section>
        <SectionTitle>Overdue tasks</SectionTitle>
        {overdueRows.length > 0 ? (
          <BasicTable columns={overdueColumns} rows={overdueRows} />
        ) : (
          <ReportSubtitle>Nothing is overdue.</ReportSubtitle>
        )}
      </section>
    </Report>
  )
}

export default ProjectsReport
