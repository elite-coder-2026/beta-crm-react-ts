import type { Member } from '../members-list'
import type { Project } from './project-types'
import { getProjectStats } from './project-templates'
import PrimaryButton from '../buttons/primary-button'
import { PlusIcon } from '../../icons'
import { getInitials } from '../../utils/get-initials'
import {
  Avatar,
  Avatars,
  CardBody,
  CardFooter,
  ColorBar,
  Grid,
  Header,
  NewProjectTile,
  Percent,
  ProgressFill,
  ProgressTrack,
  ProjectCard,
  ProjectDescription,
  ProjectName,
  Stats,
  Title,
} from './projects-overview.styles'

const MAX_AVATARS = 3

interface ProjectsOverviewProps {
  projects: Project[]
  members: Member[]
  onOpen: (projectId: string) => void
  onCreate: () => void
}

function ProjectsOverview({ projects, members, onOpen, onCreate }: ProjectsOverviewProps) {
  const membersById = new Map(members.map((m) => [m.id, m]))

  return (
    <>
      <Header>
        <Title>Projects</Title>
        <PrimaryButton onClick={onCreate}>
          <PlusIcon />
          New project
        </PrimaryButton>
      </Header>

      <Grid>
        {projects.map((project) => {
          const stats = getProjectStats(project.board)
          const assignees = stats.assigneeIds
            .map((id) => membersById.get(id))
            .filter((member): member is Member => member !== undefined)

          return (
            <ProjectCard key={project.id} type="button" onClick={() => onOpen(project.id)}>
              <ColorBar $color={project.color} />
              <CardBody>
                <ProjectName>{project.name}</ProjectName>
                <ProjectDescription>
                  {project.description || 'No description'}
                </ProjectDescription>
                <Stats>
                  {stats.total} {stats.total === 1 ? 'card' : 'cards'} ·{' '}
                  {project.board.columns.length} columns
                </Stats>
                <ProgressTrack
                  role="progressbar"
                  aria-label={`${project.name} progress`}
                  aria-valuenow={stats.percentDone}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <ProgressFill $color={project.color} $percent={stats.percentDone} />
                </ProgressTrack>
                <CardFooter>
                  <Avatars>
                    {assignees.slice(0, MAX_AVATARS).map((member) => (
                      <Avatar key={member.id} title={member.name}>
                        {getInitials(member.name)}
                      </Avatar>
                    ))}
                    {assignees.length > MAX_AVATARS && (
                      <Avatar>+{assignees.length - MAX_AVATARS}</Avatar>
                    )}
                  </Avatars>
                  <Percent>{stats.percentDone}% done</Percent>
                </CardFooter>
              </CardBody>
            </ProjectCard>
          )
        })}

        <NewProjectTile type="button" onClick={onCreate}>
          <PlusIcon />
          New project
        </NewProjectTile>
      </Grid>
    </>
  )
}

export default ProjectsOverview
