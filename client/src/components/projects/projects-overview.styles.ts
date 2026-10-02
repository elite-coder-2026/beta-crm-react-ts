import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`

export const ProjectCard = styled.button`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow);
  text-align: left;
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const ColorBar = styled.span<{ $color: string }>`
  height: 4px;
  background: ${({ $color }) => $color};
`

export const CardBody = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
`

export const ProjectName = styled.span`
  font-size: 16px;
  font-weight: 600;
`

export const ProjectDescription = styled.span`
  display: -webkit-box;
  min-height: 2.8em;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-text-muted);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const Stats = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

export const ProgressTrack = styled.span`
  display: block;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--color-neutral-bg);
`

export const ProgressFill = styled.span<{ $color: string; $percent: number }>`
  display: block;
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  transition: width 0.3s ease;
`

export const CardFooter = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`

export const Avatars = styled.span`
  display: flex;

  & > * + * {
    margin-left: -8px;
  }
`

export const Avatar = styled.span`
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 2px solid var(--color-surface);
  border-radius: 50%;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: 10px;
  font-weight: 600;
`

export const Percent = styled.span`
  font-size: 12px;
  font-weight: 600;
`

export const NewProjectTile = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 180px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: var(--color-accent);
    background: var(--color-accent-bg);
    color: var(--color-accent);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`
