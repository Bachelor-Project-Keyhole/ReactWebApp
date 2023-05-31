import * as React from 'react'
import Button from '../Button'
import SubHeader from '../SubHeader/SubHeader'
import LineChartComponent from '../LineChart/LineChartComponent'
import BarChartComponent from '../BarChart/BarChartComponent'
import { useDatapointContext, type IDatapoint, type IDatapointEntry, type ILatestEntry } from '../../contexts/DatapointContext/DatapointContext'
import { type ITemplatePost, type ITemplate } from '../../contexts/TemplateContext/TemplateContext'
import { get, random } from 'lodash'

interface TemplateCreatorProps {
  handleOnDragStart: (event: React.DragEvent<HTMLDivElement>, template: ITemplatePost) => void
  dashboardId: string
}

const styles: React.CSSProperties = {
  width: 200,
  height: 500
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

// const mediumsizeStyles: React.CSSProperties = {
//   width: '100%',
//   height: '100%'
// }

const previewStyles: React.CSSProperties = {
  width: 200,
  height: 200

}

const TemplateCreator = ({ dashboardId, handleOnDragStart, ...props }: TemplateCreatorProps): JSX.Element => {
  const [displayName, setDisplayName] = React.useState('' as string)
  const [template, setTemplate] = React.useState<'BarChart' | 'LineChart' | 'Numeric'>('Numeric')
  const [timespan, setTimespan] = React.useState(0)
  const [datapoints, setDatapoints] = React.useState<IDatapoint[]>([])
  const [datapointEntries, setDatapointEntries] = React.useState<IDatapointEntry[]>([])
  const [latestEntry, setLatestEntry] = React.useState<ILatestEntry>({ latestValue: 0, change: 0, directionIsUp: true, comparisonIsAbsolute: true })
  const { getDatapoints, getDatapointEntries, getLatestEntryWithChange } = useDatapointContext()
  const [datapointId, setDatapointId] = React.useState('')
  const [timeUnit, setTimeUnit] = React.useState<'Day' | 'Week' | 'Month' | 'Year'>('Day')
  const [isHoverTemplate, setIsHoverTemplate] = React.useState(false)

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

  const getDatapointName = () => {
    if (datapoints) { var item = datapoints.find(d => d.id === datapointId) }
    if (item != null) { return item.displayName }

    return ''
  }

  React.useLayoutEffect(() => {
    handleGetDatapoints()
  }, [handleGetDatapoints])

  React.useEffect(() => {
    handleGetDatapointEntries()
    handleGetLatestEntry()
  }, [datapointId, timeUnit, timespan, template])

  const handleMouseEnter = () => {
    setIsHoverTemplate(true)
  }

  const handleMouseLeave = () => {
    setIsHoverTemplate(false)
  }

  return (
        <div style={{ ...styles }}>
            <div>
                <SubHeader text='Datapoint' />
                <select style={{ ...selectStyle }}
                    onChange={ e => { setDatapointId(e.currentTarget.value) }} >
                    <option key={0} value={0} hidden={true}></option>
                    {datapoints
                      ? datapoints.map(
                        (datapoint) => <option key={datapoint.id}
                            value={datapoint.id} >{datapoint.displayName}</option>)
                      : 'no data'}
                </select>
            </div>
            <div>
                <SubHeader text='Display type' />
                <Button text='Line Chart' onClick={() => { setTemplate('LineChart') }}
                    style={template === 'LineChart' ? { ...selectedButtonStyle } : { ...buttonStyle }} />
                <Button text='Bar Chart' onClick={() => { setTemplate('BarChart') }}
                    style={template === 'BarChart' ? { ...selectedButtonStyle } : { ...buttonStyle }} />
            </div>
            <div>
                <SubHeader text='Timespan' />
                <input type='number' value={timespan} style={{ ...inputStyle }}
                    onChange={ e => { setTimespan(e.currentTarget.valueAsNumber) }} />
            </div>
            <div>
                <SubHeader text='Time unit' />
                <select style={{ ...selectStyle }} onChange={ e => {
                  switch (e.currentTarget.value) {
                    case 'Day':
                      setTimeUnit('Day')
                      break
                    case 'Week':
                      setTimeUnit('Week')
                      break
                    case 'Month':
                      setTimeUnit('Month')
                      break
                    case 'Year':
                      setTimeUnit('Year')
                      break
                    default:
                      setTimeUnit('Day')
                      break
                  }
                }} >
                    <option key='Day' value ='Day' >Day</option>
                    <option key='Week' value='Week' >Week</option>
                    <option key='Month' value='Month' >Month</option>
                    <option key='Year' value='Year' >Year</option>
                </select>
            </div>
            <SubHeader text='Preview' />
            <div
                draggable
                onDragStart={(e) => {
                  handleOnDragStart(e, {
                    dashboardId,
                    datapointId,
                    displayType: template,
                    timeUnit,
                    timePeriod: timespan,
                    positionWidth: 0,
                    positionHeight: 0,
                    sizeWidth: 1,
                    sizeHeight: 1,
                    displayName: getDatapointName()
                  })
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ ...previewStyles, border: isHoverTemplate ? '1px solid black' : 'none' }}>
                { datapointEntries && template === 'LineChart' &&
                    <LineChartComponent
                        data={datapointEntries} latestEntry={latestEntry} datapointName={getDatapointName()} ></LineChartComponent>
                }
                { datapointEntries && template === 'BarChart' &&
                    <BarChartComponent
                        data={datapointEntries} latestEntry={latestEntry} datapointName={getDatapointName()} ></BarChartComponent>
                }
            </div>
        </div>
  )
}

export default TemplateCreator
