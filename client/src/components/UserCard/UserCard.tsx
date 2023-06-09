import * as React from 'react'
import Card from '../Card'
import Button from '../Button'

export interface UserCardProps {
    name: string
    email: string
    role: string
    onEdit?: () => void
}

const UserCard = ({ name, email, role, onEdit, ...props }: UserCardProps): JSX.Element => {
    return (
        <Card style={{ ...props }}>
            <div style={{ ...innerStyles }}>
                <div style={{ ...nameStyles }}>{name}</div>
                <div style={{ ...fieldStyles }}>{email}</div>
                <div style={{ ...fieldStyles }}>{role}</div>
                <div style={{ ...fieldStyles }}>
                    <Button onClick={onEdit} text={'Edit'} style={{ ...buttonStyles}} />
                </div>
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

export const nameStyles: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 'bold'
  }
  
  export const fieldStyles: React.CSSProperties = {
    fontSize: 14
  }

export const buttonStyles: React.CSSProperties = {
    width: 100,
    height: 24,
    backgroundColor: '#4285f4',
    color: 'white',
    borderRadius: 8,
    border: '0px',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 16
}

export default UserCard
