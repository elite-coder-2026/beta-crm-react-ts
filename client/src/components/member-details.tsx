import { useEffect } from 'react'
import PrimaryButton from './buttons/primary-button'
import type { Member } from './members-list'
import { CloseIcon, EditIcon } from '../icons'
import { getInitials } from '../utils/get-initials'
import { StatusBadge } from './members-list.styles'
import {
  CloseButton,
  DetailLabel,
  DetailRow,
  Details,
  DetailValue,
  LargeAvatar,
  Overlay,
  Panel,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  Profile,
  ProfileName,
} from './member-details.styles'

interface MemberDetailsProps {
  member: Member | null
  onClose: () => void
  onEdit?: (member: Member) => void
}

function MemberDetails({ member, onClose, onEdit }: MemberDetailsProps) {
  useEffect(() => {
    if (!member) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [member, onClose])

  if (!member) return null

  return (
    <Overlay onClick={onClose}>
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <PanelHeader>
          <PanelTitle id="member-details-title">Member details</PanelTitle>
          <CloseButton type="button" aria-label="Close" onClick={onClose} autoFocus>
            <CloseIcon />
          </CloseButton>
        </PanelHeader>

        <Profile>
          <LargeAvatar>{getInitials(member.name)}</LargeAvatar>
          <ProfileName>{member.name}</ProfileName>
          <StatusBadge $status={member.status}>{member.status}</StatusBadge>
        </Profile>

        <Details>
          <DetailRow>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{member.email}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Role</DetailLabel>
            <DetailValue>{member.role}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Member ID</DetailLabel>
            <DetailValue>#{member.id}</DetailValue>
          </DetailRow>
        </Details>

        {onEdit && (
          <PanelFooter>
            <PrimaryButton onClick={() => onEdit(member)}>
              <EditIcon />
              Edit member
            </PrimaryButton>
          </PanelFooter>
        )}
      </Panel>
    </Overlay>
  )
}

export default MemberDetails
