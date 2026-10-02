import styled from 'styled-components'

export const VisuallyHidden = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
  white-space: nowrap;
`

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: none;
`

export const Legend = styled.legend`
  margin-bottom: 8px;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
`

export const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const Swatch = styled.label<{ $color: string; $selected: boolean }>`
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ $color }) => $color};
  box-shadow: ${({ $color, $selected }) =>
    $selected ? `0 0 0 2px var(--color-surface), 0 0 0 4px ${$color}` : 'none'};
  cursor: pointer;
  transition: box-shadow 0.15s ease;

  &:focus-within {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }
`

export const Templates = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

export const TemplateOption = styled.label<{ $selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border: 1px solid
    ${({ $selected }) => ($selected ? 'var(--color-accent)' : 'var(--color-border)')};
  border-radius: 10px;
  background: ${({ $selected }) => ($selected ? 'var(--color-accent-bg)' : 'var(--color-surface)')};
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--color-accent);
  }

  &:focus-within {
    box-shadow: 0 0 0 3px var(--color-accent-bg);
  }
`

export const TemplateName = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const TemplateDescription = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

export const TemplateColumns = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
`

export const ColumnChip = styled.span`
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
  font-size: 11px;
  font-weight: 500;
`
