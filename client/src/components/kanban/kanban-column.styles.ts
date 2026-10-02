import styled from 'styled-components'

export const ColumnRoot = styled.section<{ $isDropTarget: boolean }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  background: var(--color-neutral-bg);
  border: 2px solid ${({ $isDropTarget }) => ($isDropTarget ? 'var(--color-accent)' : 'transparent')};
  border-radius: var(--radius);
  transition: border-color 0.15s ease;
`

export const ColumnHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 10px 8px 14px;
`

export const Dot = styled.span<{ $color: string }>`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

export const ColumnTitle = styled.h3`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Count = styled.span`
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 600;
`

export const IconButton = styled.button`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;

  &:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 48px;
  padding: 4px 10px 10px;
`

export const DropIndicator = styled.div`
  height: 3px;
  margin: -2px 0;
  border-radius: 2px;
  background: var(--color-accent);
`

export const EmptyColumn = styled.p`
  padding: 16px 8px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  color: var(--color-text-muted);
  font-size: 13px;
  text-align: center;
`

export const AddCardButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 10px 10px;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const Composer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px 10px;
`

export const ComposerInput = styled.textarea`
  width: 100%;
  min-height: 64px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  box-shadow: var(--shadow);
  font-size: 14px;
  resize: none;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const ComposerActions = styled.div`
  display: flex;
  gap: 8px;
`
