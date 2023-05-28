import * as React from 'react'
import UserService from "../../contexts/Authentication/UserService"

export interface IProtectedComponentProps {
    requiredRole: string
    children: any
}

const ProtectedComponent = ({ requiredRole, children}: IProtectedComponentProps) => {
    const isAuthorized = UserService.isAuthorized(requiredRole)
    console.log(isAuthorized)
    if(!isAuthorized) {
        return <p></p>
    }

    return children
}

export default ProtectedComponent