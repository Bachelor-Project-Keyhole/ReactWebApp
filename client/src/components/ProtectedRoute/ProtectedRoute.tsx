import * as React from 'react'
import UserService from "../../contexts/Authentication/UserService"
import { Navigate } from 'react-router-dom'

export interface IProtectedRouteProps {
    requiredRole: string
    children: any
}

const ProtectedRoute = ({ requiredRole, children}: IProtectedRouteProps) => {
    const isAuthorized = UserService.isAuthorized(requiredRole)
    console.log(isAuthorized)
    if(!isAuthorized) {
        return <Navigate to='/' replace />
    }

    return children
}

export default ProtectedRoute
