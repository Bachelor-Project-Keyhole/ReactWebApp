import * as React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import SubHeader from '../SubHeader/SubHeader'
import Title from '../Title/Title'
import UpArrowIcon from '../UpArrowIcon/UpArrowIcon'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon'
import { type ILatestEntry, IDatapointEntry } from '../../contexts/DatapointContext/DatapointContext'
import { margin } from 'polished'
import Description from '../Description/Description'

export interface LineChartComponentProps {
  style?: React.CSSProperties
  data: any[]
  latestEntry: ILatestEntry
  datapointName: string
}

export const wrapperStyle: React.CSSProperties = {
  width: 200,
  height: 200,
  border: '1px solid black'
}

export const LineChartStyle: React.CSSProperties = {
  width: '60%',
  height: '60%',
  marginTop: 8
}

export const lastEntryStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: -16,
  height: '30%'
  // backgroundColor: 'red'
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

const LineChartComponent = (
  { data, datapointName, latestEntry, style, ...props }: LineChartComponentProps): JSX.Element => {
  return (
        <div style={{ ...wrapperStyle, ...style }}>
            <div style={{ ...nameStyle }}>
                <Description text={datapointName} style={{ lineHeight: 0, fontSize: '100%' }} />
            </div>
            <ResponsiveContainer width='80%' height='60%' >
                <LineChart style={{ ...LineChartStyle }} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line type='monotone' dataKey='value'
                        stroke='#8884d8' activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <div style={{ ...lastEntryStyle }} >
                <Description style={{ fontSize: '100%', lineHeight: 0 }} text={ latestEntry.latestValue.toString() }/>
                <div style={{ ...directionStyle }} >
                    {latestEntry.isDirectionUp && latestEntry.change > 0 &&
                        <UpArrowIcon size={20} color='#03C04A' ></UpArrowIcon>
                    }
                    {latestEntry.isDirectionUp && latestEntry.change < 0 &&
                        <DownArrowIcon size={20} color='#FF0000' ></DownArrowIcon>
                    }
                    {!latestEntry.isDirectionUp && latestEntry.change < 0 &&
                        <DownArrowIcon size={20} color='#03C04A' ></DownArrowIcon>
                    }
                    {!latestEntry.isDirectionUp && latestEntry.change > 0 &&
                        <DownArrowIcon size={20} color='#FF0000' ></DownArrowIcon>
                    }
                    { latestEntry.isComparisonAbsolute &&
                        <p>{latestEntry.change}</p>
                    }
                    { !latestEntry.isComparisonAbsolute &&
                        <p>{latestEntry.change} %</p>
                    }
                </div>
            </div>
        </div>
  )
}

export default LineChartComponent
