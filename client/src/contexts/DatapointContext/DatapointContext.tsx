import { get } from 'lodash'
import * as React from 'react'
import UserService from '../Authentication/UserService'
import instance from '../Authentication/AxiosInterceptorService'

export interface IFormula {
  operation: string
  factor: number
}

export interface IDatapoint {
  id: string
  organizationId: number
  dataPointKey: string
  displayName: string
  isDirectionUp: boolean
  isComparisonAbsolute: boolean
  latestValue: number
  formula: IFormula
}

export const initialDatapoint: IDatapoint = {
  id: '',
  organizationId: 0,
  dataPointKey: '',
  displayName: '',
  isDirectionUp: false,
  isComparisonAbsolute: false,
  latestValue: 0,
  formula: {
    operation: 'None',
    factor: 0
  }
}

export interface IDatapointForm {
  id: string
  organizationId: number
  dataPointKey: string
  displayName: string
  isDirectionUp: string
  isComparisonAbsolute: string
  latestValue: number
  operation: string
  factor: number
}

export const initialDatapointForm: IDatapointForm = {
  id: '',
  organizationId: 0,
  dataPointKey: '',
  displayName: '',
  isDirectionUp: 'false',
  isComparisonAbsolute: 'false',
  latestValue: 0,
  operation: 'None',
  factor: 0
}

export interface IDatapointEntry {
  value: number
  timestamp: string
}

export interface ILatestEntry {
  latestValue: number
  change: number
  isDirectionUp: boolean
  isComparisonAbsolute: boolean
}

export interface IDatapointContext {
  datapoints: any[]
  getDatapoints: () => Promise<any>
  patchDatapoint: (datapoint: any) => Promise<any>
  postDatapoint: (datapoint: any) => Promise<any>
  getDatapointEntries: (
    datapointId: string, period: number, timeUnit: string) => Promise<any>
  getLatestEntryWithChange: (
    datapointId: string, period: number, timeUnit: string) => Promise<any>
}

export const DatapointContext = React.createContext<IDatapointContext>({
  datapoints: [],
  getDatapoints: async () => {},
  patchDatapoint: async (datapoint: any) => {},
  postDatapoint: async (datapoint: any) => {},
  getDatapointEntries: async (
    datapointId: string, period: number, timeUnit: string) => {},
  getLatestEntryWithChange: async (
    datapointId: string, period: number, timeUnit: string) => {}
})

export const DatapointProvider: React.FC<{ children: any }> = props => {
  const user = UserService.getCurrentUser()
  console.log('USER', user)

  const getDatapoints = React.useCallback(async () => {
    try {
      const response = await instance({
        method: 'get',
        url: 'datapoint/' + user.user.organizationId
      })

      const datapoints = get(response, 'data')
      return datapoints
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getDatapointEntries = React.useCallback(async (
    datapointId: string, period: number, timeUnit: string) => {
    try {
      const response = await instance({
        method: 'get',
        url: 'template/' + user.user.organizationId + '/' +
            datapointId + '?timePeriod=' + period + '&timeUnit=' + timeUnit + '&displayType=abc'
      })

      const entries = get(response, 'data')
      return entries
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getLatestEntryWithChange = React.useCallback(async (
    datapointId: string, period: number, timeUnit: string) => {
    try {
      const response = await instance({
        method: 'get',
        url: 'template/latest-value-with-change/' + datapointId +
            '?timePeriod=' + period + '&timeUnit=' + timeUnit
      })
      const entry = get(response, 'data')
      return entry
    } catch (error) {
      console.log(error)
    }
  }, [])

  const patchDatapoint = React.useCallback(async (datapoint: any) => {
    try {
      const response = await instance.patch(
        'datapoint',
        datapoint
      )
      const updatedDatapoint = response.data
      console.log('UPDATED DATAPOINT', updatedDatapoint)
    } catch (error) {
      console.error('Error updating datapoint', error)
    }
  }, [])

  const postDatapoint = React.useCallback(async (datapoint: any) => {
    console.log('POSTING DATAPOINT', datapoint)

    try {
      const response = await instance.post(
        'datapoint',
        datapoint
      )
      const newDatapoint = response.data
      console.log('NEW DATAPOINT', newDatapoint)
    } catch (error) {
      console.error('Error creating datapoint', error)
    }
  }, [])

  return (
        <DatapointContext.Provider value={{
          datapoints: [],
          getDatapoints,
          patchDatapoint,
          postDatapoint,
          getDatapointEntries,
          getLatestEntryWithChange
        }}>
            {props.children}
        </DatapointContext.Provider>
  )
}

export const useDatapointContext = (): IDatapointContext => React.useContext(DatapointContext)
