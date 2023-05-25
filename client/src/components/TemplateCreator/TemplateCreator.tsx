import * as React from 'react'
import Button from '../Button'
import SubHeader from '../SubHeader/SubHeader'
import LineChartComponent from '../LineChart/LineChartComponent'
import BarChartComponent from '../BarChart/BarChartComponent'
import { useDatapointContext, type IDatapoint, type IDatapointEntry, type ILatestEntry } from '../../contexts/DatapointContext/DatapointContext'

interface TemplateCreatorProps {
    
}

const styles: React.CSSProperties = {
    width: '30vh',
    height: '80vh',
}

const buttonStyle: React.CSSProperties = {
    width: '11vh',
    marginLeft: '1vh'
}

const selectedButtonStyle: React.CSSProperties = {
    width: '11vh',
    marginLeft: '1vh',
    background: '#0275d8',
    color: 'white'
}

const selectStyle: React.CSSProperties = {
    width: '100%'
}

const inputStyle: React.CSSProperties = {
    width: '97%'
}

const mediumsizeStyles: React.CSSProperties = {
    width: '100%',
    height: '100%'
}

const previewStyles: React.CSSProperties = {
    width: '100%',
    height: '20%'
}

const TemplateCreator = ({ ...props }: TemplateCreatorProps ): JSX.Element => {
    const [ template, setTemplate ] = React.useState('')
    const [ timespan, setTimespan ] = React.useState(0)
    const [ datapoints, setDatapoints ] = React.useState<IDatapoint[]>([])
    const [ datapointEntries, setDatapointEntries ] = React.useState<IDatapointEntry[]>([])
    const [ latestEntry, setLatestEntry ] = React.useState<ILatestEntry>({latestValue: 0, change: 0, directionIsUp: true, comparisonIsAbsolute: true})
    const { getDatapoints, getDatapointEntries, getLatestEntryWithChange } = useDatapointContext()
    const [ datapointId, setDatapointId ] = React.useState('')
    const [ timeUnit, setTimeUnit ] = React.useState('Day' || 'Week' || 'Month' || 'Year')
    

    const handleGetDatapoints = React.useCallback(async () => {
        try {
          const response = await getDatapoints()
          setDatapoints(response)
        } catch (error) {
          console.log('error', error)
        }
    }, [getDatapoints])

    const handleGetDatapointEntries = React.useCallback(async () => {
        try {
            const response = await getDatapointEntries(
                datapointId, timespan, timeUnit)
            setDatapointEntries(response)
            
        } catch (error) {
            console.log('error', error)
        }
    }, [getDatapointEntries, datapointId, timespan, timeUnit])

    const handleGetLatestEntry = React.useCallback(async () => {
        try {
            const response = await getLatestEntryWithChange(
                datapointId, timespan, timeUnit)
            setLatestEntry(response)
        } catch (error) {
            console.log(error)
        }
    }, [getDatapointEntries, datapointId, timespan, timeUnit])

    const getDatapointName = ()=> {
        if(datapoints)
            var item =  datapoints.find(d => d.id === datapointId)
            if(item)
                return item.displayName
            
        return ''
    }

    React.useLayoutEffect(() => {
        handleGetDatapoints()
    }, [handleGetDatapoints])

    React.useEffect(() => {
        handleGetDatapointEntries()
        handleGetLatestEntry()
    }, [datapointId, timeUnit, timespan, template])

    return (
        <div style={{ ...styles }}>
            <div>
                <SubHeader text='Datapoint' />
                <select style={{ ...selectStyle }}
                    onChange={ e => setDatapointId(e.currentTarget.value)} >
                    <option key={0} value={0} hidden={true}></option>
                    {datapoints.map(
                        (datapoint) => <option key={datapoint.id}
                            value={datapoint.id} >{datapoint.displayName}</option>)}
                </select>
            </div>
            <div>
                <SubHeader text='Display type' />
                <Button text='Line Chart' onClick={() => setTemplate('Line')}
                    style={template == 'Line' ?  { ...selectedButtonStyle } : { ...buttonStyle }}  />
                <Button text='Bar Chart' onClick={() => setTemplate('Bar')}
                    style={template == 'Bar' ?  { ...selectedButtonStyle } : { ...buttonStyle }} />
            </div>
            <div>
                <SubHeader text='Timespan' />
                <input type='number' value={timespan} style={{ ...inputStyle }}
                    onChange={ e => setTimespan(e.currentTarget.valueAsNumber)} />
            </div>
            <div>
                <SubHeader text='Time unit' />
                <select style={{ ...selectStyle }} onChange={ e => setTimeUnit(e.currentTarget.value)} >
                    <option key='Day' value='Day' >Day</option>
                    <option key='Week' value='Week' >Week</option>
                    <option key='Month' value='Month' >Month</option>
                    <option key='Year' value='Year' >Year</option>
                </select>
            </div>
            <SubHeader text='Preview' />
            <div style={{ ...previewStyles }}>
                { datapointEntries && template == 'Line' && 
                    <LineChartComponent componentStyle={{ ...mediumsizeStyles }}
                        data={datapointEntries} latestEntry={latestEntry} datapointName={getDatapointName()} ></LineChartComponent>
                }
                { datapointEntries && template == 'Bar' &&
                    <BarChartComponent componentStyle={{ ...mediumsizeStyles }}
                        data={datapointEntries} latestEntry={latestEntry} datapointName={getDatapointName()} ></BarChartComponent>
                }   
            </div>
        </div>
    )
}

export default TemplateCreator
