import * as React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import SubHeader from '../SubHeader/SubHeader'
import { type IDatapointEntry, type ILatestEntry } from '../../contexts/DatapointContext/DatapointContext'
import UpArrowIcon from '../UpArrowIcon/UpArrowIcon'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon'
import Title from '../Title/Title'
import Description from '../Description'
import { border } from 'polished'

export interface BarChartComponentProps {
  data: IDatapointEntry[]
  latestEntry: ILatestEntry
  datapointName: string
  style?: React.CSSProperties
}

export const wrapperStyle: React.CSSProperties = {
  width: 200,
  height: 200,
  border: '1px solid black'
}

export const barChartStyle: React.CSSProperties = {
  width: '60%',
  height: '60%',
  marginTop: -8
}

export const lastEntryStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: -16,
  height: '30%'
}

export const nameStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  lineHeight: 0,
  height: '10%'
}

export const directionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  placeItems: 'center'
}

const BarChartComponent = ({ data, datapointName, latestEntry, style, ...props }: BarChartComponentProps): JSX.Element => {
  return (
        <div style={{ ...wrapperStyle, ...style }}>
            <div style={{ ...nameStyle }}>
                <Description text={datapointName} style={{ lineHeight: 0, fontSize: '90%' }} />
            </div>
            <ResponsiveContainer width="80%" height="60%">
                <BarChart style={{ ...barChartStyle }} data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeStamp" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ ...lastEntryStyle }} >
                <Description style={{ fontSize: '100%', lineHeight: 0 }} text={ latestEntry.latestValue.toString() } />
                <div style={{ ...directionStyle }} >
                    {latestEntry.directionIsUp && latestEntry.change > 0 &&
                        <UpArrowIcon size={20} color='#03C04A' ></UpArrowIcon>
                    }
                    {latestEntry.directionIsUp && latestEntry.change < 0 &&
                        <DownArrowIcon size={20} color='#FF0000' ></DownArrowIcon>
                    }
                    {!latestEntry.directionIsUp && latestEntry.change < 0 &&
                        <DownArrowIcon size={20} color='#03C04A' ></DownArrowIcon>
                    }
                    {!latestEntry.directionIsUp && latestEntry.change > 0 &&
                        <DownArrowIcon size={20} color='#FF0000' ></DownArrowIcon>
                    }
                    { latestEntry.comparisonIsAbsolute &&
                        <p>{latestEntry.change}</p>
                    }
                    { !latestEntry.comparisonIsAbsolute &&
                        <p>{latestEntry.change} %</p>
                    }
                </div>
            </div>
        </div>
  )
}

export default BarChartComponent
