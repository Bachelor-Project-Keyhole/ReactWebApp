import * as React from 'react'

export interface GridElementProps {
  text?: string
  style?: React.CSSProperties
}

const GridElement = ({ text = 'grid element', style }: GridElementProps): JSX.Element => {
  return (
        <div draggable style={{ ...wrapperStyles, ...style }}>
            {text}
        </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',

  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  // margin: '8px',
  backgroundColor: '#f100f1'

}

export default GridElement
