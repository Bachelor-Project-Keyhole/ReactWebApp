import * as React from 'react'
import Card from '../Card'
import Button from '../Button'

export interface DatapointCardProps {
  title?: string
  description?: string
  onEdit?: () => void
  value?: string
}

const DatapointCard = ({ title, description, onEdit, value, ...props }: DatapointCardProps): JSX.Element => {
  return (
        <Card style={{ ...props }}>
            <div style={{ ...innerStyles }}>
            <div>
              <div style={{ ...titleStyles }}>{title}</div>
              {description && description.length > 0 &&
              <div style={{ ...descriptionStyles }}>{description}</div>}
            </div>
            <div style={{ ...valueStyles }}>{value}</div>
          </div>
          <div>
            <Button onClick={onEdit} text={'Edit'} style={{ ...buttonStyles }} />
          </div>
        </Card>
  )
}

export const innerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}

export const titleStyles: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold'
}

export const descriptionStyles: React.CSSProperties = {
  fontSize: 14
}

export const valueStyles: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold'
}

export const buttonStyles: React.CSSProperties = {
  width: 100,
  height: 24,
  backgroundColor: 'lightgrey',
  borderRadius: 8,
  border: '1px solid black',
  fontSize: 16,
  fontWeight: 'bold',
  cursor: 'pointer',
  marginLeft: 16
}

export default DatapointCard
