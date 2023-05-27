import * as React from 'react'
import { type IDatapoint, type IDatapointEntry, type ILatestEntry } from '../DatapointContext/DatapointContext'

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
