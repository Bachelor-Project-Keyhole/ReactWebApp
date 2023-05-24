import { get } from 'lodash'
import * as React from 'react'
import axios from 'axios'
import authorizationHeader from '../Authentication/AuthorizationHeader'
import AuthService from '../Authentication/AuthService'

export interface IFormula {
  operation: string
  factor: number
}

export interface IDatapoint {
  id: number
  organizationId: number
  // will be renamed
  dataPointKey: string
  displayName: string
  directionIsUp: boolean
  comparisonIsAbsolute: boolean
  latestValue: number
  formula: IFormula
}

export const initialDatapoint: IDatapoint = {
  id: 0,
  organizationId: 0,
  dataPointKey: '',
  displayName: '',
  directionIsUp: false,
  comparisonIsAbsolute: false,
  latestValue: 0,
  formula: {
    operation: 'None',
    factor: 0
  }
}

export interface IDatapointContext {
  datapoints: any[]
  getDatapoints: () => Promise<any>
  patchDatapoint: (datapoint: any) => Promise<any>
  postDatapoint: (datapoint: any) => Promise<any>
}

export const DatapointContext = React.createContext<IDatapointContext>({
  datapoints: [],
  getDatapoints: async () => {},
  patchDatapoint: async (datapoint: any) => {},
  postDatapoint: async (datapoint: any) => {}
})

export const DatapointProvider: React.FC<{ children: any }> = props => {
  const user = AuthService.getCurrentUser()
  console.log('USER', user)

  const getDatapoints = React.useCallback(async () => {
    try {
      console.log('USEr', user.user.id)

      const response = await axios({
        method: 'get',
        url: 'https://localhost:7173/api/v1/datapoint/' + user.user.organizationId,
        headers: authorizationHeader()
      })

      const datapoints = get(response, 'data')
      console.log('GET DATAPOINTS', datapoints)
      return datapoints
    } catch (error) {
      console.log('error', error)
    }
  }, [user])

  const patchDatapoint = React.useCallback(async (datapoint: any) => {
    try {
      const response = await axios.patch(
        'https://localhost:7173/api/v1/datapoint',
        datapoint,
        { headers: authorizationHeader() }
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
      const response = await axios.post(
        'https://localhost:7173/api/v1/datapoint',
        datapoint,
        { headers: authorizationHeader() }
      )
      const newDatapoint = response.data
      console.log('NEW DATAPOINT', newDatapoint)
    } catch (error) {
      console.error('Error creating datapoint', error)
    }
  }, [])

  return (
        <DatapointContext.Provider value={{ datapoints: [], getDatapoints, patchDatapoint, postDatapoint }}>
            {props.children}
        </DatapointContext.Provider>
  )
}

export const useDatapointContext = (): IDatapointContext => React.useContext(DatapointContext)
