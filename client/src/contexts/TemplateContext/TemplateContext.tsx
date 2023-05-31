import * as React from 'react'
import { type IDatapoint, type IDatapointEntry, type ILatestEntry } from '../DatapointContext/DatapointContext'
import instance from '../Authentication/AxiosInterceptorService'
import { get } from 'lodash'

export interface ITemplate {
  datapointId: string
  templateId: string
  displayType: string
  timeSpan: number
  // datapoints: IDatapoint[]
  datapointEntries: IDatapointEntry[]
  latestEntry: ILatestEntry
  displayName: string
}

export const initialTemplate: ITemplate = {
  datapointId: '',
  templateId: '',
  displayType: '',
  timeSpan: 0,
  // datapoints: [],
  datapointEntries: [],
  latestEntry: {
    latestValue: 0,
    change: 0,
    isDirectionUp: true,
    isComparisonAbsolute: true
  },
  displayName: ''
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
  displayName: string
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
  sizeHeight: 0,
  displayName: ''
}

export interface ITemplateContext {
  createTemplate: (template: ITemplatePost) => Promise<ITemplatePost>
  updateTemplate: (template: ITemplatePost) => Promise<ITemplatePost>
  deleteTemplate: (templateId: string) => Promise<ITemplate>
  getTemplateById: (templateId: string) => Promise<ITemplatePost>
}

export const TemplateContext = React.createContext<ITemplateContext>({
  createTemplate: async (template: ITemplatePost) => initialTemplatePost,
  updateTemplate: async (template: ITemplatePost) => initialTemplatePost,
  deleteTemplate: async (templateId: string) => initialTemplate,
  getTemplateById: async (templateId: string) => initialTemplatePost
})

export const TemplateProvider: React.FC<{ children: any }> = props => {
  const createTemplate = React.useCallback(async (template: ITemplatePost) => {
    try {
      const response = await instance({
        method: 'post',
        url: 'template',
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
      const response = await instance({
        method: 'put',
        url: 'template',
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
      const response = await instance({
        method: 'delete',
        url: 'template/' + templateId
      })
      const deletedTemplate = get(response, 'data')
      console.log('DELETE TEMPLATE ENPOINT', deletedTemplate)

      return deletedTemplate
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getTemplateById = React.useCallback(async (templateId: string) => {
    try {
      const response = await instance({
        method: 'get',
        url: 'template/' + templateId
      })
      const template = get(response, 'data')
      return template
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  return (
    <TemplateContext.Provider value={{
      createTemplate,
      updateTemplate,
      deleteTemplate,
      getTemplateById
    }}>
      {props.children}
    </TemplateContext.Provider>
  )
}

export const useTemplateContext = (): ITemplateContext => React.useContext(TemplateContext)
