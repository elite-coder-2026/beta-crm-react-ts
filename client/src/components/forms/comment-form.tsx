import { useState, type FormEvent, type KeyboardEvent } from 'react'
import PrimaryButton from '../buttons/primary-button'
import SecondaryButton from '../buttons/secondary-button'
import { getInitials } from '../../utils/get-initials'
import { Card, FormHeader, FormSubtitle, FormTitle, Textarea } from './form.styles'
import {
  CharCount,
  CommentAuthor,
  CommentAvatar,
  CommentBody,
  CommentItem,
  CommentList,
  CommentMeta,
  CommentText,
  CommentTime,
  Composer,
  ComposerActions,
  ComposerFields,
  ComposerFooter,
  EmptyComments,
} from './comment-form.styles'

export interface Comment {
  id: number
  author: string
  text: string
  createdAt: Date
}

interface CommentFormProps {
  author?: string
  initialComments?: Comment[]
  onSubmit?: (comment: Comment) => void
}

const MAX_LENGTH = 500

const formatTime = (date: Date) =>
  date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

function CommentForm({ author = 'You', initialComments = [], onSubmit }: CommentFormProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [text, setText] = useState('')

  const trimmed = text.trim()
  const isOverLimit = text.length > MAX_LENGTH
  const canSubmit = trimmed.length > 0 && !isOverLimit

  const postComment = () => {
    if (!canSubmit) return

    const comment: Comment = {
      id: Math.max(0, ...comments.map((c) => c.id)) + 1,
      author,
      text: trimmed,
      createdAt: new Date(),
    }

    setComments((current) => [...current, comment])
    setText('')
    onSubmit?.(comment)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    postComment()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      postComment()
    }
  }

  return (
    <Card $wide>
      <FormHeader>
        <FormTitle>Comments</FormTitle>
        <FormSubtitle>
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </FormSubtitle>
      </FormHeader>

      {comments.length === 0 ? (
        <EmptyComments>No comments yet. Start the conversation.</EmptyComments>
      ) : (
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentAvatar>{getInitials(comment.author)}</CommentAvatar>
              <CommentBody>
                <CommentMeta>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentTime dateTime={comment.createdAt.toISOString()}>
                    {formatTime(comment.createdAt)}
                  </CommentTime>
                </CommentMeta>
                <CommentText>{comment.text}</CommentText>
              </CommentBody>
            </CommentItem>
          ))}
        </CommentList>
      )}

      <Composer onSubmit={handleSubmit}>
        <CommentAvatar>{getInitials(author)}</CommentAvatar>
        <ComposerFields>
          <Textarea
            aria-label="Write a comment"
            placeholder="Write a comment…"
            value={text}
            aria-invalid={isOverLimit}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ComposerFooter>
            <CharCount $over={isOverLimit}>
              {text.length}/{MAX_LENGTH}
            </CharCount>
            <ComposerActions>
              {text.length > 0 && (
                <SecondaryButton onClick={() => setText('')}>Cancel</SecondaryButton>
              )}
              <PrimaryButton type="submit" disabled={!canSubmit}>
                Post comment
              </PrimaryButton>
            </ComposerActions>
          </ComposerFooter>
        </ComposerFields>
      </Composer>
    </Card>
  )
}

export default CommentForm
