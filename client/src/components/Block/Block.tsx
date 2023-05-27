import * as React from 'react'
import { type IDashboardPlaceholder } from '../../contexts/DashboardContext/DashboardContext'

export interface BlockProps {
  x: number
  y: number
  width: number
  height: number
  templateId: string
  component: React.ReactNode
}

const Block: React.FC<BlockProps> = ({ x, y, width, height, component }): JSX.Element => {
  const style: React.CSSProperties = {
    gridColumn: `${x + 1} / span ${width}`,
    gridRow: `${y + 1} / span ${height}`,
    // backgroundColor: 'red',
    border: '1px solid black'
  }

  return (
    <div style={style}>
      {component}
    </div>
  )
}

export default Block
