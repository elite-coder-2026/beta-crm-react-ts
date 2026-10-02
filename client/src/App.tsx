import { useCallback, useState } from 'react'
import MembersList, { type Member } from './components/members-list'
import AddMemberModal, { type NewMember } from './components/add-member-modal'
import MemberDetails from './components/member-details'
import PrimaryButton from './components/buttons/primary-button'
import SecondaryButton from './components/buttons/secondary-button'
import ErrorButton from './components/buttons/error-button'
import SuccessButton from './components/buttons/success-button'
import InfoButton from './components/buttons/info-button'
import Sidebar, { type SidebarSection } from './components/sidebar'
import BasicTable from './components/basic-table'
import StripedTable from './components/striped-table'
import SortableTable from './components/sortable-table'
import type { TableColumn } from './components/table-types'
import LoginForm from './components/forms/login-form'
import RegisterForm from './components/forms/register-form'
import ForgotPasswordForm from './components/forms/forgot-password-form'
import ResetPasswordForm from './components/forms/reset-password-form'
import ProfileForm from './components/forms/profile-form'
import ContactForm from './components/forms/contact-form'
import CommentForm, { type Comment } from './components/forms/comment-form'
import Notification from './components/notifications/notification'
import { useNotification } from './components/notifications/notification-context'
import Toast from './components/toasts/toast'
import { useToast } from './components/toasts/toast-context'
import KanbanBoard from './components/kanban/kanban-board'
import ProjectSwitcher from './components/projects/project-switcher'
import ProjectsOverview from './components/projects/projects-overview'
import NewProjectModal from './components/projects/new-project-modal'
import { useProjects } from './components/projects/use-projects'
import type { NewProjectValues } from './components/projects/project-types'
import { sampleProjects } from './data/sample-projects'
import SalesReport from './components/reports/sales-report'
import ProjectsReport from './components/reports/projects-report'
import ChartGallery, { type ChartGalleryItem } from './components/charts/chart-gallery'
import { sampleDeals } from './data/sample-deals'
import InvoiceTable from './components/invoices/invoice-table'
import { sampleMembers } from './data/sample-members'
import GlobalStyles from './styles/global-styles'
import { Main, ShowcaseRow, ShowcaseStack, ShowcaseSubtitle, ShowcaseTitle } from './App.styles'
import './App.css'

const sidebarSections: SidebarSection[] = [
  {
    label: 'Components',
    items: [
      { id: 'members-list', label: 'Members List' },
      { id: 'add-member-modal', label: 'Add Member Modal' },
      { id: 'member-details', label: 'Member Details' },
      { id: 'notification', label: 'Notification' },
      { id: 'toast', label: 'Toast' },
      { id: 'kanban-board', label: 'Kanban Board' },
      { id: 'projects', label: 'Projects' },
    ],
  },
  {
    label: 'Reports',
    items: [
      { id: 'sales-report', label: 'Sales Report' },
      { id: 'projects-report', label: 'Projects Report' },
    ],
  },
  {
    label: 'Charts',
    items: [
      { id: 'stat-tile', label: 'Stat Tile' },
      { id: 'line-chart', label: 'Line Chart' },
      { id: 'bar-chart', label: 'Bar Chart' },
      { id: 'horizontal-bar-chart', label: 'Horizontal Bar Chart' },
      { id: 'stacked-bar-chart', label: 'Stacked Bar Chart' },
    ],
  },
  {
    label: 'Buttons',
    items: [
      { id: 'primary-button', label: 'Primary Button' },
      { id: 'secondary-button', label: 'Secondary Button' },
      { id: 'error-button', label: 'Error Button' },
      { id: 'success-button', label: 'Success Button' },
      { id: 'info-button', label: 'Info Button' },
    ],
  },
  {
    label: 'Tables',
    items: [
      { id: 'basic-table', label: 'Basic Table' },
      { id: 'striped-table', label: 'Striped Table' },
      { id: 'sortable-table', label: 'Sortable Table' },
      { id: 'invoice-table', label: 'Invoice Table' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { id: 'login-form', label: 'Login' },
      { id: 'register-form', label: 'Register' },
      { id: 'forgot-password-form', label: 'Forgot Password' },
      { id: 'reset-password-form', label: 'Reset Password' },
      { id: 'profile-form', label: 'Profile Settings' },
      { id: 'contact-form', label: 'Contact' },
      { id: 'comment-form', label: 'Comment' },
    ],
  },
]

const chartGalleryItems: ChartGalleryItem[] = [
  'stat-tile',
  'line-chart',
  'bar-chart',
  'horizontal-bar-chart',
  'stacked-bar-chart',
]
const wideItems = ['kanban-board', 'sales-report', 'projects-report', 'invoice-table']

const sampleComments: Comment[] = [
  {
    id: 1,
    author: 'Liam Carter',
    text: 'Followed up with the client today. They want a demo next week.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
  {
    id: 2,
    author: 'Ava Thompson',
    text: 'Great, I can run it Tuesday afternoon.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
]

const memberColumns: TableColumn<Member>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]

function App() {
  const { notify } = useNotification()
  const { toast } = useToast()
  const [activeComponent, setActiveComponent] = useState(sidebarSections[0].items[0].id)
  const { projects, activeProject, setActiveProjectId, addProject, updateProjectBoard } =
    useProjects(sampleProjects)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)

  const openNewProject = () => setIsNewProjectOpen(true)
  const closeNewProject = useCallback(() => setIsNewProjectOpen(false), [])

  const openProject = (projectId: string) => {
    setActiveProjectId(projectId)
    setActiveComponent('kanban-board')
  }

  const handleCreateProject = (values: NewProjectValues) => {
    const project = addProject(values)
    setIsNewProjectOpen(false)
    setActiveComponent('kanban-board')
    toast({ variant: 'success', message: `Created project “${project.name}”` })
  }
  const [members, setMembers] = useState<Member[]>(sampleMembers)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [viewingMemberId, setViewingMemberId] = useState<number | null>(null)

  const viewingMember = members.find((m) => m.id === viewingMemberId) ?? null

  const openMemberDetails = (member: Member) => setViewingMemberId(member.id)
  const closeMemberDetails = useCallback(() => setViewingMemberId(null), [])

  const openAddMember = () => {
    setEditingMember(null)
    setIsMemberModalOpen(true)
  }

  const openEditMember = (member: Member) => {
    setViewingMemberId(null)
    setEditingMember(member)
    setIsMemberModalOpen(true)
  }

  const closeMemberModal = useCallback(() => setIsMemberModalOpen(false), [])

  const handleSubmitMember = (member: NewMember) => {
    if (editingMember) {
      setMembers((current) =>
        current.map((m) => (m.id === editingMember.id ? { ...member, id: m.id } : m)),
      )
    } else {
      setMembers((current) => [
        ...current,
        { ...member, id: Math.max(0, ...current.map((m) => m.id)) + 1 },
      ])
    }
    setIsMemberModalOpen(false)
  }

  const handleRemoveMember = (member: Member) =>
    setMembers((current) => current.filter((m) => m.id !== member.id))

  return (
    <>
      <GlobalStyles />
      <Sidebar
        sections={sidebarSections}
        activeId={activeComponent}
        onSelect={setActiveComponent}
      />
      <Main $wide={wideItems.includes(activeComponent)}>
        {activeComponent === 'sales-report' && (
          <SalesReport deals={sampleDeals} members={members} />
        )}

        {activeComponent === 'invoice-table' && <InvoiceTable />}

        {activeComponent === 'projects-report' && (
          <ProjectsReport projects={projects} members={members} />
        )}

        {chartGalleryItems.includes(activeComponent as ChartGalleryItem) && (
          <ChartGallery chart={activeComponent as ChartGalleryItem} />
        )}

        {activeComponent === 'members-list' && (
          <MembersList members={members} onAddMember={openAddMember} />
        )}

        {activeComponent === 'primary-button' && (
          <>
            <ShowcaseTitle>Primary Button</ShowcaseTitle>
            <ShowcaseRow>
              <PrimaryButton>Primary</PrimaryButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
            </ShowcaseRow>
          </>
        )}

        {activeComponent === 'secondary-button' && (
          <>
            <ShowcaseTitle>Secondary Button</ShowcaseTitle>
            <ShowcaseRow>
              <SecondaryButton>Secondary</SecondaryButton>
              <SecondaryButton disabled>Disabled</SecondaryButton>
            </ShowcaseRow>
          </>
        )}

        {activeComponent === 'error-button' && (
          <>
            <ShowcaseTitle>Error Button</ShowcaseTitle>
            <ShowcaseRow>
              <ErrorButton>Error</ErrorButton>
              <ErrorButton disabled>Disabled</ErrorButton>
            </ShowcaseRow>
          </>
        )}

        {activeComponent === 'success-button' && (
          <>
            <ShowcaseTitle>Success Button</ShowcaseTitle>
            <ShowcaseRow>
              <SuccessButton>Success</SuccessButton>
              <SuccessButton disabled>Disabled</SuccessButton>
            </ShowcaseRow>
          </>
        )}

        {activeComponent === 'info-button' && (
          <>
            <ShowcaseTitle>Info Button</ShowcaseTitle>
            <ShowcaseRow>
              <InfoButton>Info</InfoButton>
              <InfoButton disabled>Disabled</InfoButton>
            </ShowcaseRow>
          </>
        )}

        {activeComponent === 'add-member-modal' && (
          <>
            <ShowcaseTitle>Add Member Modal</ShowcaseTitle>
            <PrimaryButton onClick={openAddMember}>Open modal</PrimaryButton>
          </>
        )}

        {activeComponent === 'member-details' && (
          <>
            <ShowcaseTitle>Member Details</ShowcaseTitle>
            <PrimaryButton
              disabled={members.length === 0}
              onClick={() => openMemberDetails(members[0])}
            >
              View member
            </PrimaryButton>
          </>
        )}

        {activeComponent === 'notification' && (
          <>
            <ShowcaseTitle>Notification</ShowcaseTitle>
            <ShowcaseRow>
              <SuccessButton
                onClick={() =>
                  notify({
                    variant: 'success',
                    title: 'Member saved',
                    message: 'Your changes have been saved.',
                  })
                }
              >
                Success
              </SuccessButton>
              <ErrorButton
                onClick={() =>
                  notify({
                    variant: 'error',
                    title: 'Something went wrong',
                    message: 'We couldn’t save your changes. Please try again.',
                  })
                }
              >
                Error
              </ErrorButton>
              <InfoButton
                onClick={() =>
                  notify({
                    variant: 'info',
                    title: 'New comment',
                    message: 'Liam Carter replied to your comment.',
                  })
                }
              >
                Info
              </InfoButton>
              <SecondaryButton
                onClick={() =>
                  notify({
                    variant: 'warning',
                    title: 'Subscription ending soon',
                    message: 'Your plan renews in 3 days.',
                  })
                }
              >
                Warning
              </SecondaryButton>
            </ShowcaseRow>

            <ShowcaseSubtitle>Variants</ShowcaseSubtitle>
            <ShowcaseStack>
              <Notification variant="success" title="Success" message="The action completed." />
              <Notification variant="error" title="Error" message="The action failed." />
              <Notification variant="info" title="Info" message="Something you should know." />
              <Notification variant="warning" title="Warning" message="Something needs attention." />
            </ShowcaseStack>
          </>
        )}

        {activeComponent === 'toast' && (
          <>
            <ShowcaseTitle>Toast</ShowcaseTitle>
            <ShowcaseRow>
              <SecondaryButton onClick={() => toast({ message: 'Link copied to clipboard' })}>
                Default
              </SecondaryButton>
              <SuccessButton
                onClick={() => toast({ variant: 'success', message: 'Member added' })}
              >
                Success
              </SuccessButton>
              <ErrorButton
                onClick={() => toast({ variant: 'error', message: 'Couldn’t connect to server' })}
              >
                Error
              </ErrorButton>
              <PrimaryButton
                onClick={() =>
                  toast({
                    message: 'Conversation archived',
                    action: {
                      label: 'Undo',
                      onClick: () => toast({ variant: 'success', message: 'Conversation restored' }),
                    },
                  })
                }
              >
                With action
              </PrimaryButton>
            </ShowcaseRow>

            <ShowcaseSubtitle>Variants</ShowcaseSubtitle>
            <ShowcaseStack>
              <Toast message="Link copied to clipboard" />
              <Toast variant="success" message="Member added" />
              <Toast variant="error" message="Couldn’t connect to server" />
              <Toast
                message="Conversation archived"
                action={{ label: 'Undo', onClick: () => {} }}
              />
            </ShowcaseStack>
          </>
        )}

        {activeComponent === 'kanban-board' && activeProject && (
          <KanbanBoard
            key={activeProject.id}
            initialBoard={activeProject.board}
            members={members}
            onBoardChange={(board) => updateProjectBoard(activeProject.id, board)}
            header={
              <ProjectSwitcher
                projects={projects}
                activeProject={activeProject}
                onSelect={setActiveProjectId}
                onCreate={openNewProject}
              />
            }
          />
        )}

        {(activeComponent === 'projects' ||
          (activeComponent === 'kanban-board' && !activeProject)) && (
          <ProjectsOverview
            projects={projects}
            members={members}
            onOpen={openProject}
            onCreate={openNewProject}
          />
        )}

        {activeComponent === 'basic-table' && (
          <>
            <ShowcaseTitle>Basic Table</ShowcaseTitle>
            <BasicTable
              columns={memberColumns}
              rows={members}
              selectable
              onView={openMemberDetails}
              onEdit={openEditMember}
              onRemove={handleRemoveMember}
            />
          </>
        )}

        {activeComponent === 'striped-table' && (
          <>
            <ShowcaseTitle>Striped Table</ShowcaseTitle>
            <StripedTable
              columns={memberColumns}
              rows={members}
              selectable
              onView={openMemberDetails}
              onEdit={openEditMember}
              onRemove={handleRemoveMember}
            />
          </>
        )}

        {activeComponent === 'sortable-table' && (
          <>
            <ShowcaseTitle>Sortable Table</ShowcaseTitle>
            <SortableTable
              columns={memberColumns}
              rows={members}
              selectable
              onView={openMemberDetails}
              onEdit={openEditMember}
              onRemove={handleRemoveMember}
            />
          </>
        )}

        {activeComponent === 'login-form' && (
          <LoginForm
            onForgotPassword={() => setActiveComponent('forgot-password-form')}
            onRegister={() => setActiveComponent('register-form')}
          />
        )}

        {activeComponent === 'register-form' && (
          <RegisterForm onLogin={() => setActiveComponent('login-form')} />
        )}

        {activeComponent === 'forgot-password-form' && (
          <ForgotPasswordForm onBackToLogin={() => setActiveComponent('login-form')} />
        )}

        {activeComponent === 'reset-password-form' && <ResetPasswordForm />}

        {activeComponent === 'profile-form' && (
          <ProfileForm
            initialValues={{ firstName: 'Ava', lastName: 'Thompson', email: 'ava@example.com' }}
          />
        )}

        {activeComponent === 'contact-form' && <ContactForm />}

        {activeComponent === 'comment-form' && (
          <CommentForm author="Ava Thompson" initialComments={sampleComments} />
        )}
      </Main>
      {isNewProjectOpen && (
        <NewProjectModal onCreate={handleCreateProject} onClose={closeNewProject} />
      )}
      <MemberDetails
        member={viewingMember}
        onClose={closeMemberDetails}
        onEdit={openEditMember}
      />
      <AddMemberModal
        isOpen={isMemberModalOpen}
        member={editingMember}
        onClose={closeMemberModal}
        onSubmit={handleSubmitMember}
      />
    </>
  )
}

export default App
