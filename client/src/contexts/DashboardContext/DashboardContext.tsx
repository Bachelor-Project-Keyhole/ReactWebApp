import * as React from 'react'
import authorizationHeader from '../Authentication/AuthorizationHeader'
import axios from 'axios'
import { get } from 'lodash'

const API_URL = 'https://localhost:7173/api/v1'

// {
//   "dashboardId": "string",
//   "dashboardName": "string",
//   "placeholders": [
//     {
//       "positionHeight": 0,
//       "positionWidth": 0,
//       "sizeHeight": 0,
//       "sizeWidth": 0,
//       "templateId": "string",
//       "values": [
//         {
//           "value": 0,
//           "time": "2023-05-26T14:05:48.012Z"
//         }
//       ],
//       "change": 0,
//       "comparison": true,
//       "latestValue": 0,
//       "isDirectionUp": true
//     }
//   ]
// }

export interface IDashboard {
  dashboardId: string
  dashboardName: string
  placeholders: IDashboardPlaceholder[]
}

export interface IDashboardPlaceholder {
  positionHeight: number
  positionWidth: number
  sizeHeight: number
  sizeWidth: number
  templateId: string
  values: IDashboardPlaceholderValue[]
  change: number
  comparison: boolean
  latestValue: number
  isDirectionUp: boolean
}

export interface IDashboardPlaceholderValue {
  value: number
  time: string
}

export const initialDashboard: IDashboard = {
  dashboardId: '',
  dashboardName: '',
  placeholders: []
}

export interface IDashboardContext {
  loadDashboard: (datapoint: any) => Promise<any>
}

export const DashboardContext = React.createContext<IDashboardContext>({
  loadDashboard: async (datapoint: any) => {}
})

export const DashboardProvider: React.FC<{ children: any }> = props => {
  const loadDashboard = React.useCallback(async (dashboardId: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + '/dashboard/load/' + dashboardId,
        headers: authorizationHeader()
      })
      const dashboard = get(response, 'data')
      console.log('GET DASHBOARD', dashboard)
      return dashboard
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  return (
        <DashboardContext.Provider value={{
          loadDashboard
        }}>
            {props.children}
        </DashboardContext.Provider>
  )
}

export const useDashboardContext = (): IDashboardContext => React.useContext(DashboardContext)
