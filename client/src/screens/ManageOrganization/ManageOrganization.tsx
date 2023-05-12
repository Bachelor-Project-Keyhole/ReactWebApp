import * as React from 'react'
import CardList from '../../components/CardList'
import Title from '../../components/Title'

export interface ManageOrganizationProps {
    companyName: string
    users: any[]  // TODO: make an entity for users and use it here
}

 // TODO: Context and methods for pulling users

const ManageUsers = ({ ...props }: ManageOrganizationProps): any => {
    
    const handler = () => {}

    return (
        <>
            <Title text={props.companyName} />
            <div>
            <CardList cardType='MemberCard' data={ props.users } editHandler={ handler } /> 
            </div>
        </>
    )
}

export default ManageUsers
