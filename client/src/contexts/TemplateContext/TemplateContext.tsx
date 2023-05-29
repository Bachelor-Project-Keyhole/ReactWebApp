import * as React from 'react'
import { type IDatapoint, type IDatapointEntry, type ILatestEntry } from '../DatapointContext/DatapointContext'
import axios from 'axios'
import authorizationHeader from '../Authentication/AuthorizationHeader'
import { get } from 'lodash'

const API_URL = 'https://localhost:7173/api/v1'
export interface ITemplate {
  datapointId: string
  templateId: string
  templateType: string
  timeSpan: number
  datapoints: IDatapoint[]
  datapointEntries: IDatapointEntry[]
  latestEntry: ILatestEntry
}

export const initialTemplate: ITemplate = {
  datapointId: '',
  templateId: '',
  templateType: '',
  timeSpan: 0,
  datapoints: [],
  datapointEntries: [],
  latestEntry: {
    latestValue: 0,
    change: 0,
    directionIsUp: true,
    comparisonIsAbsolute: true
  }
}

// Update to ITemplate
export interface ITemplatePost {
  dashboardId: string
  datapointId: string
  displayType: 'BarChart' | 'LineChart' | 'Numeric'
  timePeriod: number
  timeUnit: 'Day' | 'Week' | 'Month' | 'Year'
  positionWidth: number
  positionHeight: number
  sizeWidth: number
  sizeHeight: number
}

export const initialTemplatePost: ITemplatePost = {
  dashboardId: '',
  datapointId: '',
  displayType: 'Numeric',
  timePeriod: 1,
  timeUnit: 'Day',
  positionWidth: 0,
  positionHeight: 0,
  sizeWidth: 0,
  sizeHeight: 0
}

export interface ITemplateContext {
  createTemplate: (template: ITemplatePost) => Promise<ITemplate>
  updateTemplate: (template: ITemplatePost) => Promise<ITemplate>
  deleteTemplate: (templateId: string) => Promise<ITemplate>
}

export const TemplateContext = React.createContext<ITemplateContext>({
  createTemplate: async (template: ITemplatePost) => initialTemplate,
  updateTemplate: async (template: ITemplatePost) => initialTemplate,
  deleteTemplate: async (templateId: string) => initialTemplate
})

export const TemplateProvider: React.FC<{ children: any }> = props => {
  const createTemplate = React.useCallback(async (template: ITemplatePost) => {
    try {
      const response = await axios({
        method: 'post',
        url: API_URL + '/template',
        headers: authorizationHeader(),
        data: template
      })
      const newTemplate = get(response, 'data')
      console.log('CREATE TEMPLATE ENPOINT', newTemplate)

      return newTemplate
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const updateTemplate = React.useCallback(async (template: ITemplatePost) => {
    try {
      const response = await axios({
        method: 'put',
        url: API_URL + '/template',
        headers: authorizationHeader(),
        data: template
      })
      const updatedTemplate = get(response, 'data')
      console.log('UPDATE TEMPLATE ENPOINT', updatedTemplate)

      return updatedTemplate
    } catch (error) {
      console.log('error', error)
    }
  }, [])


  const deleteTemplate = React.useCallback(async (templateId: string) => {
    try {
      const response = await axios({
        method: 'delete',
        url: API_URL + '/template/' + templateId,
        headers: authorizationHeader()
      })
      const deletedTemplate = get(response, 'data')
      console.log('DELETE TEMPLATE ENPOINT', deletedTemplate)

      return deletedTemplate
    } catch (error) {
      console.log('error', error)
    }
  }, [])


  return (
    <TemplateContext.Provider value={{
      createTemplate,
      updateTemplate,
      deleteTemplate
    }}>
      {props.children}
    </TemplateContext.Provider>
  )
}

export const useTemplateContext = (): ITemplateContext => React.useContext(TemplateContext)