import * as React from 'react'
import axios from 'axios'

const API_URL = 'https://localhost:7173/api/manage/'

export interface IManageOrganizationContext {
    getOrganizationMembers: () => Promise<any>
    changeMemberRole: (email: string, role: string) => Promise<any>
    removeMember: (email: string) => Promise<any>
    addMember: (email: string) => Promise<any>
}

export const ManageOrganizationContext = React.createContext<IManageOrganizationContext>({
    getOrganizationMembers: async () => {},
    changeMemberRole: async () => {},
    removeMember: async () => {},
    addMember: async () => {}
})

export const ManageOrganizationProvider: React.FC<{ children: any }> = props => {
    const getOrganizationMembers = () => {
        const name = getCurrentOrganizationName()
        return axios.get(API_URL + 'members/' + name, {
        }).then(response => {
            if(response.status) {
                localStorage.setItem('members', JSON.stringify(response.data))
            }
        })
    }

    const getCurrentOrganizationName = () => {
        const name = localStorage.getItem("organizationName")
        if (name) return JSON.parse(name)
    }

    const changeMemberRole = (email: string, role: string) => {
        return axios.post(API_URL + 'changeRole', {
            email,
            role
        }).then( response => {
            return response.data
        })
    }

    const removeMember = (email: string) => {
        return axios.post(API_URL + 'remove', {
            email
        }).then(response => {
            return response.data
        })
    }

    const addMember = (email: string) => {
        return axios.post(API_URL + 'add', {
            email
        }).then(response => {
            return response.data
        })
    }

    return (
        <ManageOrganizationContext.Provider
            value={{ getOrganizationMembers, changeMemberRole,
            removeMember, addMember }}>
                {props.children}
            </ManageOrganizationContext.Provider>
    )
}

export const useManageOrganizationContext = (
    ): IManageOrganizationContext => React.useContext(ManageOrganizationContext)
