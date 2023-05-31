import Header from '../../components/Header/Header'
import * as React from 'react'
import { config } from 'webpack'
import UserService from './UserService'
import instance from './AxiosInterceptorService'
import { useCookies } from 'react-cookie'
import TokenService from './TokenService'

export interface IAuthServiceContext {
    login: (email: string, password: string) => Promise<any>
    logout: () => Promise<any>,
    registerCompany: (
        fullName: string, email: string, password: string,
        organizationName: string) => Promise<any>
    registerUser: (
      fullName: string, password: string, token: string) => Promise<any>,
    requestPasswordReset: (email: string) => Promise<any>,
    resetPassword: (password: string, token: string) => Promise<any>
}

export const AuthServiceContext = React.createContext<IAuthServiceContext>({
  login: async (email: string, password: string) => {},
  logout: async () => {},
  registerCompany: async (fullName: string, email: string, password: string,
    organizationName: string) => {},
  registerUser: async (fullName: string, password: string, token: string) => {},
  requestPasswordReset: async (email: string) => {},
  resetPassword: async (password: string, token: string) => {}
})

export const AuthServiceProvider: React.FC<{ children: any }> = props => {
    const [ cookies, setCookie ] = useCookies(['token', 'refreshToken'])

    const login = React.useCallback(async (email: string, password: string) => {
      return instance
        .post('authentication/login', {
          email,
          password
        })
        .then(response => {
          if (response.status === 200) {
            TokenService.setUser(response.data)
            if (navigator.cookieEnabled) {
              var timestampToken = new Date(response.data.expiration)
              var timestampRefresh = new Date(response.data.refreshTokenExpiration)
                setCookie('token', response.data.token, {path: '/', expires: timestampToken})
                setCookie('refreshToken', response.data.refreshToken, {path: '/', expires: timestampRefresh})
            }
          }
          return response.data
        })
    }, [])

    const logout = React.useCallback(async () => {
        const user = UserService.getCurrentUser();
        localStorage.removeItem('user')
        return instance.post('authentication/logout', { token: user.refreshToken })
    }, [])

    const registerCompany = React.useCallback(async (
      fullName: string, email: string, password: string,
      organizationName: string) => {
        try {
          const response = instance.post('organization/register', {
            email,
            password,
            fullName,
            organizationName
          })
          return response
        } catch (error) {
          console.log(error)
        }
      }, [])

    const registerUser = React.useCallback(async (
      fullName: string, password: string, token: string) => {
        return instance.post('organization/register/' + token, {
          fullName,
          password
        })
    }, [])

    const requestPasswordReset = React.useCallback(async (email: string) => {
      try {
        const response = instance.post('organization/password/send/email', {email})
        return response
      } catch (error) {
        console.log(error)
      }
    }, [])

    const resetPassword = React.useCallback(async (password: string, token: string) => {
      try {
        const response = instance.post('organization/password/reset', {password, token})
        return response
      } catch (error) {
        console.log(error)
      }
    }, [])

    return (
      <AuthServiceContext.Provider value={{ login, logout, registerUser,
        registerCompany, requestPasswordReset, resetPassword }} >
          {props.children}
      </AuthServiceContext.Provider>
    )
}

export const useAuthServiceContext = (): IAuthServiceContext => React.useContext(AuthServiceContext)
