import * as React from 'react'
import Button from '../Button/Button'

export interface CardProps {
  title: string
  description: string
  onEdit: () => void
  style?: React.CSSProperties
}

const Card = ({ title, description, onEdit, style, ...props }: CardProps): JSX.Element => {
  return (
        <div style={{ ...cardStyles, ...style }}>
          <div>
            <div style={{ ...titleStyles }}>{title}</div>
            <div style={{ ...descriptionStyles }}>{description}</div>
          </div>
          <div>
            <Button onClick={onEdit} text={'Edit'} />
          </div>
        </div>
  )
}

export const cardStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
  height: 48,
  width: 'auto',
  opacity: 1,
  // boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  border: '1px solid black',
  padding: 8
}

export const titleStyles: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold'
}

export const descriptionStyles: React.CSSProperties = {
  fontSize: 14
}

export default Card
