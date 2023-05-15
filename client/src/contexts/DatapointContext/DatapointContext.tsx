import { get } from 'lodash'
import * as React from 'react'
import axios from 'axios'

export interface IDatapoint {
  id: number
  organizationId: number
  // will be renamed
  dataPointKey: string
  displayName: string
  directionIsUp: boolean
  comparisonIsAbsolute: boolean
}

export const initialDatapoint: IDatapoint = {
  id: 0,
  organizationId: 0,
  dataPointKey: '',
  displayName: '',
  directionIsUp: false,
  comparisonIsAbsolute: false
}

export interface IDatapointContext {
  datapoints: any[]
  getDatapoints: () => Promise<any>
  patchDatapoint: (datapoint: any) => Promise<any>
}

export const DatapointContext = React.createContext<IDatapointContext>({
  datapoints: [],
  getDatapoints: async () => {},
  patchDatapoint: async (datapoint: any) => {}
})

export const DatapointProvider: React.FC<{ children: any }> = props => {
  const getDatapoints = React.useCallback(async () => {
    try {
      const response = await axios({
        method: 'get',
        // url: 'http://localhost:5161/Datapoint/645cdf7dfb420436aebe0559'
        url: 'https://localhost:7173/api/v1/datapoint/645cdf7dfb420436aebe0559'
        // url: 'https://jsonplaceholder.typicode.com/todos/1'
      })

      const datapoints = get(response, 'data')
      return datapoints
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const patchDatapoint = React.useCallback(async (datapoint: any) => {
    try {
      const response = await axios.patch(
        'https://localhost:7173/api/v1/datapoint',
        datapoint
      )
      const updatedDatapoint = response.data
      console.log('UPDATED DATAPOINT', updatedDatapoint)
    } catch (error) {
      console.error('Error updating datapoint', error)
    }
  }, [])

  return (
        <DatapointContext.Provider value={{ datapoints: [], getDatapoints, patchDatapoint }}>
            {props.children}
        </DatapointContext.Provider>
  )
}

export const useDatapointContext = (): IDatapointContext => React.useContext(DatapointContext)
