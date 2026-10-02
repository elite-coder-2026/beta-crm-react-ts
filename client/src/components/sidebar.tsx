import { Brand, ItemButton, Items, Nav, Section, SectionLabel } from './sidebar.styles'

export interface SidebarItem {
  id: string
  label: string
}

export interface SidebarSection {
  label: string
  items: SidebarItem[]
}

interface SidebarProps {
  sections: SidebarSection[]
  activeId: string
  onSelect: (id: string) => void
}

function Sidebar({ sections, activeId, onSelect }: SidebarProps) {
  return (
    <Nav>
      <Brand>Beta CRM</Brand>
      {sections.map((section) => (
        <Section key={section.label}>
          <SectionLabel>{section.label}</SectionLabel>
          <Items>
            {section.items.map((item) => (
              <li key={item.id}>
                <ItemButton
                  type="button"
                  $active={item.id === activeId}
                  aria-current={item.id === activeId ? 'page' : undefined}
                  onClick={() => onSelect(item.id)}
                >
                  {item.label}
                </ItemButton>
              </li>
            ))}
          </Items>
        </Section>
      ))}
    </Nav>
  )
}

export default Sidebar
