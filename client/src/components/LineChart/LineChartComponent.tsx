import * as React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import SubHeader from '../SubHeader/SubHeader'
import Title from '../Title/Title'
import UpArrowIcon from '../UpArrowIcon/UpArrowIcon'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon'
import { ILatestEntry, IDatapointEntry } from '../../contexts/DatapointContext/DatapointContext'

export interface LineChartComponentProps {
    componentStyle: React.CSSProperties
    data: any[]
    latestEntry: ILatestEntry
    datapointName: string
}

export const LineChartStyle: React.CSSProperties = {
    width: '100%',
    height: '100%'
}

export const lastEntryStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
}

export const nameStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
}

export const directionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    placeItems: 'center'
}

const LineChartComponent = (
    { componentStyle, data, datapointName, latestEntry, ...props}: LineChartComponentProps ): JSX.Element => {

    return (
        <div style={{ ...componentStyle }}>
            <div style={{ ...nameStyle }}>
                <SubHeader text={datapointName} />
            </div>
            <ResponsiveContainer width='100%' height='100%' >
                <LineChart style={{ ...LineChartStyle }} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='value'
                        stroke='#8884d8' activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <div style={{ ...lastEntryStyle }} >
                <Title style={{ margin: '0'}} text={ latestEntry.latestValue.toString() } />
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

export default LineChartComponent
