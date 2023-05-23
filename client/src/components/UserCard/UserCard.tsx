import * as React from 'react'
import Card from '../Card'
import Button from '../Button'

export interface UserCardProps {
    name: string
    email: string
    role: string
    status: string
}

const UserCard = ({ name, email, role, status, ...props }: UserCardProps): JSX.Element => {
    return (
        <Card style={{ ...props }}>
            <div style={{ ...innerStyles}}>
                <div style={{ ...nameStyles }}>{name}</div>
                <div style={{ ...fieldStyles }}>{email}</div>
                <div style={{ ...fieldStyles }}>{role}</div>
                <div style={{ ...fieldStyles }}>{status}</div>
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
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    border: '1px solid black',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 16
}

export default UserCard
