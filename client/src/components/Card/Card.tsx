import * as React from 'react'

export interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

const Card = ({ children, style, ...props }: CardProps): JSX.Element => {
  return (
        <div style={{ ...cardStyles, ...style }}>
          {children}
        </div>
  )
}

export const cardStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
  // height: 48,
  width: 'auto',
  opacity: 1,
  // boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  border: '1px solid black',
  padding: 8
}

export default Card
