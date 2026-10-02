import { useState, type ReactNode } from 'react'
import {
  Card,
  DataTable,
  Empty,
  Header,
  Legend,
  LegendItem,
  LegendKey,
  Subtitle,
  TableWrap,
  Title,
  Titles,
  ViewButton,
  ViewToggle,
} from './chart-card.styles'

export interface LegendEntry {
  label: string
  color: string
  shape?: 'line' | 'rect'
}

export interface ChartTableData {
  columns: string[]
  rows: (string | number)[][]
}

interface ChartCardProps {
  title: string
  subtitle?: string
  /** Shown for two or more series. A single series is named by the title. */
  legend?: LegendEntry[]
  /** The accessible twin of the chart: every value, without hovering. */
  table: ChartTableData
  /** How many grid columns the card spans in a report grid. */
  span?: number
  isEmpty?: boolean
  children: ReactNode
}

function ChartCard({
  title,
  subtitle,
  legend,
  table,
  span,
  isEmpty = false,
  children,
}: ChartCardProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart')

  return (
    <Card $span={span}>
      <Header>
        <Titles>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Titles>
        <ViewToggle role="group" aria-label={`${title} view`}>
          <ViewButton
            type="button"
            $active={view === 'chart'}
            aria-pressed={view === 'chart'}
            onClick={() => setView('chart')}
          >
            Chart
          </ViewButton>
          <ViewButton
            type="button"
            $active={view === 'table'}
            aria-pressed={view === 'table'}
            onClick={() => setView('table')}
          >
            Table
          </ViewButton>
        </ViewToggle>
      </Header>

      {legend && legend.length > 1 && view === 'chart' && (
        <Legend>
          {legend.map((entry) => (
            <LegendItem key={entry.label}>
              <LegendKey $color={entry.color} $shape={entry.shape ?? 'rect'} />
              {entry.label}
            </LegendItem>
          ))}
        </Legend>
      )}

      {isEmpty ? (
        <Empty>No data for this selection.</Empty>
      ) : view === 'chart' ? (
        children
      ) : (
        <TableWrap>
          <DataTable>
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </DataTable>
        </TableWrap>
      )}
    </Card>
  )
}

export default ChartCard
