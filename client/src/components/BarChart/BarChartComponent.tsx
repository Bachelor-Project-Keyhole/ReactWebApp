import * as React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import SubHeader from '../SubHeader/SubHeader'
import { IDatapointEntry, ILatestEntry } from '../../contexts/DatapointContext/DatapointContext'
import UpArrowIcon from '../UpArrowIcon/UpArrowIcon'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon'
import Title from '../Title/Title'

export interface BarChartComponentProps {
    componentStyle: React.CSSProperties
    data: IDatapointEntry[]
    latestEntry: ILatestEntry
    datapointName: string
}

export const barChartStyle: React.CSSProperties = {
    width: '500',
    height: '500'
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

const BarChartComponent = ({componentStyle, data, datapointName, latestEntry, ...props}: BarChartComponentProps ): JSX.Element => {

    return (
        <div style={{ ...componentStyle }}>
            <div style={{ ...nameStyle }}>
                <SubHeader text={datapointName} />
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart style={{ ...barChartStyle }} data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeStamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
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

export default BarChartComponent