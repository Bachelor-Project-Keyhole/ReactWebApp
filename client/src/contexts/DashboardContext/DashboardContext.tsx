import * as React from 'react'
import authorizationHeader from '../Authentication/AuthorizationHeader'
import { get, update } from 'lodash'
import { ITemplatePost } from '../TemplateContext/TemplateContext'
import { type IDatapointEntry } from '../DatapointContext/DatapointContext'
import instance from '../Authentication/AxiosInterceptorService'

export interface IDashboard {
  dashboardId?: string
  dashboardName: string
  placeholders: IDashboardPlaceholder[]
}

export interface IDashboardPlaceholder/* extends ITemplatePost */ {
  positionHeight: number
  positionWidth: number
  sizeHeight: number
  sizeWidth: number
  templateId: string
  values: IDatapointEntry[]
  change: number
  comparison: boolean
  latestValue: number
  isDirectionUp: boolean
  datapointId: string
  displayName: string
  displayType: string
  /**/
  // values: IDashboardPlaceholderValue[]
  // change: number

}

// export interface IDashboardPlaceholderValue {
//   value: number
//   time: string
// }

export const initialDashboard: IDashboard = {
  dashboardId: '',
  dashboardName: '',
  placeholders: []
}

export interface IDashboardContext {
  getDashboards: (organizationId: string) => Promise<any[]>
  newDashboard: (dashboardName: string, organizationId: string) => Promise<any>
  loadDashboard: (datapoint: any) => Promise<any>
  updateDashboard: (dashboardName: string, organizationId: string) => Promise<any>
}

export const DashboardContext = React.createContext<IDashboardContext>({
  getDashboards: async (organizationId: string) => [],
  newDashboard: async (dashboardName: string, organizationId: string) => {},
  loadDashboard: async (datapoint: any) => {},
  updateDashboard: async (dashboardName: string, organizationId: string) => {}
})

export const DashboardProvider: React.FC<{ children: any }> = props => {
  const getDashboards = React.useCallback(async (organizationId: string) => {
    try {
      const response = await instance({
        method: 'get',
        url: 'dashboard/all/' + organizationId
      })
      const dashboards = get(response, 'data')
      console.log('GET DASHBOARDS', dashboards)
      return dashboards
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const newDashboard = React.useCallback(async (dashboardName: string, organizationId: string) => {
    try {
      const response = await instance({
        method: 'post',
        url: 'dashboard',
        data: { dashboardName, organizationId }
      })
      const newDashboard = get(response, 'data')
      console.log('NEW DASHBOARD', newDashboard)
      return newDashboard
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const loadDashboard = React.useCallback(async (dashboardId: string) => {
    try {
      const response = await instance({
        method: 'get',
        url: 'dashboard/load/' + dashboardId
      })
      const dashboard = get(response, 'data')
      console.log('GET DASHBOARD', dashboard)
      return dashboard
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const updateDashboard = React.useCallback(async (dashboardName: string, dashboardId: string) => {
    try {
      console.log('UPDATE DASHBOARD', dashboardName, dashboardId)

      const response = await instance({
        method: 'put',
        url: 'dashboard',
        data: { dashboardName, dashboardId }
      })
      const newDashboard = get(response, 'data')
      return newDashboard
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  return (
        <DashboardContext.Provider value={{
          getDashboards,
          newDashboard,
          loadDashboard,
          updateDashboard
        }}>
            {props.children}
        </DashboardContext.Provider>
  )
}

export const useDashboardContext = (): IDashboardContext => React.useContext(DashboardContext)
