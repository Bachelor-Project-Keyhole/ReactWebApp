import * as React from 'react'
import { get } from 'lodash'
import axios from 'axios'
import authorizationHeader from '../Authentication/AuthorizationHeader'
import instance from '../Authentication/AxiosInterceptorService'

export interface IOrganization {
    organizationId: string
    organizationOwnerId: string
    organizationName: string
    apiKey: string
    creationDate: string
    modificationDate: string
}

export interface IManageOrganizationContext {
    getOrganizationMembers: () => Promise<any>
    getOrganizationDetails: () => Promise<any>
    changeMemberRole: (userId: string, role: string) => Promise<any>
    removeMember: (id: string) => Promise<any>
    inviteMember: (email: string, roles: string, message: string) => Promise<any>
}

export const ManageOrganizationContext = React.createContext<IManageOrganizationContext>({
    getOrganizationMembers: async () => {},
    getOrganizationDetails: async () => {},
    changeMemberRole: async (userId: string, role: string) => {},
    removeMember: async () => {},
    inviteMember: async (email:string, roles: string, message: string) => {}
})

export const ManageOrganizationProvider: React.FC<{ children: any }> = props => {
    const getCurrentOrganizationId = () => {
        const userstr = localStorage.getItem('user')
        if (userstr)
            var user = JSON.parse(userstr)
        return user.user.organizationId
    }

    const getOrganizationMembers = React.useCallback(async () => {
        const id = getCurrentOrganizationId()
        try {
            const response = await instance({
                method: 'get',
                url: 'organization/users/' + id
            })

            const members = get(response, 'data')
            return members
        } catch (error) {
            console.log(error)
        }
    }, [])

    const changeMemberRole = React.useCallback(
        async (userId: string, setAccessLevel: string) => {
        try {
            const response = await instance.post('organization/access',
                { userId, setAccessLevel }   
            )
            return response
        } catch (error) {
            console.log(error)
        }
    }, [])

    const removeMember = React.useCallback( async (id: string) => {
        try {
            const response = await instance({
                method: 'delete',
                url: 'organization/remove/user/' + id
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }, [])

    const inviteMember = React.useCallback(async (
        receiverEmailAddress: string, accessLevel: string, message: string) => {
        var organizationId = getCurrentOrganizationId()
        try {
            const response = await instance.post(
                'organization/invite/email',
                {organizationId, receiverEmailAddress, accessLevel, message}
            )
        return response.data
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getOrganizationDetails = React.useCallback(
        async () => {
            var id = getCurrentOrganizationId()
            try {
                const response = await instance.get('organization/' + id)
                return get(response, 'data')
            } catch (error) {
                console.log(error)
            }
    }, [])

    return (
        <ManageOrganizationContext.Provider
            value={{ getOrganizationMembers, getOrganizationDetails,
                inviteMember, changeMemberRole,removeMember }}>
                    {props.children}
            </ManageOrganizationContext.Provider>
    )
}

export const useManageOrganizationContext = (
    ): IManageOrganizationContext => React.useContext(ManageOrganizationContext)
