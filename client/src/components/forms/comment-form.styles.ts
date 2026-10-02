import styled from 'styled-components'

export const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
`

export const CommentItem = styled.li`
  display: flex;
  gap: 12px;
`

export const CommentAvatar = styled.div`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
`

export const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`

export const CommentMeta = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
`

export const CommentAuthor = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const CommentTime = styled.time`
  font-size: 12px;
  color: var(--color-text-muted);
`

export const CommentText = styled.p`
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
`

export const EmptyComments = styled.p`
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--color-text-muted);
`

export const Composer = styled.form`
  display: flex;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
`

export const ComposerFields = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ComposerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const ComposerActions = styled.div`
  display: flex;
  gap: 8px;
`

export const CharCount = styled.span<{ $over: boolean }>`
  font-size: 12px;
  color: ${({ $over }) => ($over ? 'var(--color-danger)' : 'var(--color-text-muted)')};
`
