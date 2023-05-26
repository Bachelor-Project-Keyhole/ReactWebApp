import * as React from 'react'
import { get } from 'lodash'
import axios from 'axios'
import authorizationHeader from '../Authentication/AuthorizationHeader'

const API_URL = 'https://localhost:7173/api/v1/organization/'

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
    inviteMember: (email: string, roles: string[], message: string) => Promise<any>
}

export const ManageOrganizationContext = React.createContext<IManageOrganizationContext>({
    getOrganizationMembers: async () => {},
    getOrganizationDetails: async () => {},
    changeMemberRole: async (userId: string, role: string) => {},
    removeMember: async () => {},
    inviteMember: async (email:string, roles: string[], message: string) => {}
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
            const response = await axios({
                method: 'get',
                url: API_URL + 'users/' + id,
                headers: authorizationHeader()
            })

            const members = get(response, 'data')
            console.log(members)
            return members
        } catch (error) {
            console.log(error)
        }
    }, [])

    const changeMemberRole = React.useCallback(
        async (userId: string, setAccessLevel: string) => {
        try {
            const response = await axios.post(API_URL + 'access',
                { userId, setAccessLevel },
                { headers: authorizationHeader() }    
            )
            return response
        } catch (error) {
            console.log(error)
        }
    }, [])

    const removeMember = React.useCallback( async (id: string) => {
        try {
            const response = await axios({
                method: 'delete',
                url: API_URL + 'remove/user/' + id,
                headers: authorizationHeader()
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }, [])

    const inviteMember = React.useCallback(async (
        receiverEmailAddress: string, accessLevels: string[], message: string) => {
        var organizationId = getCurrentOrganizationId()
        try {
            const response = await axios.post(
                API_URL + 'invite/email',
                {organizationId, receiverEmailAddress, accessLevels, message},
                { headers: authorizationHeader() }
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
                const response = await axios.get(
                    API_URL + id, { headers: authorizationHeader() })
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
