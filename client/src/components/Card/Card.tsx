import * as React from 'react'

export interface CardProps {
  title: string
  description: string
  style?: React.CSSProperties
}

const Card = ({ title, description, style, ...props }: CardProps): JSX.Element => {
  return (
        <div style={{ ...cardStyles, ...style }}>
            <div style={{ ...titleStyles }}>{title}</div>
            <div style={{ ...descriptionStyles }}>{description}</div>
        </div>
  )
}

export const cardStyles: React.CSSProperties = {
  height: 100,
  width: 100,
  backgroundColor: 'white',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  border: '1px solid black',
  padding: '10px'
}

export const titleStyles: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold'
}

export const descriptionStyles: React.CSSProperties = {
  fontSize: 14
}

export default Card
