import PrimaryButton from './buttons/primary-button'
import { getInitials } from '../utils/get-initials'
import {
  Avatar,
  Count,
  Empty,
  Header,
  HeaderActions,
  Info,
  Item,
  List,
  Meta,
  Name,
  StatusBadge,
  Title,
} from './members-list.styles'

export type MemberStatus = 'active' | 'inactive' | 'pending'

export interface Member {
  id: number
  name: string
  email: string
  role: string
  status: MemberStatus
}

interface MembersListProps {
  members: Member[]
  onAddMember?: () => void
}

function MembersList({ members, onAddMember }: MembersListProps) {
  return (
    <>
      <Header>
        <Title>Members</Title>
        <HeaderActions>
          <Count>{members.length} total</Count>
          <PrimaryButton onClick={onAddMember}>Add member</PrimaryButton>
        </HeaderActions>
      </Header>
      {members.length === 0 ? (
        <Empty>No members yet.</Empty>
      ) : (
        <List>
          {members.map((member) => (
            <Item key={member.id}>
              <Avatar>{getInitials(member.name)}</Avatar>
              <Info>
                <Name>{member.name}</Name>
                <Meta>
                  {member.email} · {member.role}
                </Meta>
              </Info>
              <StatusBadge $status={member.status}>{member.status}</StatusBadge>
            </Item>
          ))}
        </List>
      )}
    </>
  )
}

export default MembersList
