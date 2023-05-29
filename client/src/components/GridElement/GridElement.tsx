import * as React from 'react'
import { type ITemplate } from '../../contexts/TemplateContext/TemplateContext'
import LineChartComponent from '../LineChart/LineChartComponent'
import { Bar } from 'recharts'
import BarChartComponent from '../BarChart/BarChartComponent'
import Button from '../Button/Button'
import Title from '../Title/Title'

export interface GridElementProps {
  onClose: () => void
  text?: string
  template?: ITemplate
  style?: React.CSSProperties
}

const GridElement = ({ onClose, text = 'grid element', template, style }: GridElementProps): JSX.Element => {
  return (
        <div style={{ ...wrapperStyles, ...style }}>
          <Button onClick={onClose} text={'X'} style={{ zIndex: 10, position: 'absolute', top: 0, right: 0 }} />
            {template?.templateType === 'Line' &&
                <LineChartComponent
                  style={{ ...LineChartStyle }}
                  data={template.datapoints}
                  latestEntry={{
                    latestValue: template.latestEntry.latestValue,
                    change: template.latestEntry.change,
                    directionIsUp: template.latestEntry.directionIsUp,
                    comparisonIsAbsolute: template.latestEntry.comparisonIsAbsolute
                  }}
                  datapointName={'asd'}
                  />
            }
            {template?.templateType === 'Bar' &&
                <BarChartComponent
                  style={{ width: '100%', height: '100%' }}
                  data={template.datapointEntries}
                  latestEntry={{
                    latestValue: template.latestEntry.latestValue,
                    change: template.latestEntry.change,
                    directionIsUp: template.latestEntry.directionIsUp,
                    comparisonIsAbsolute: template.latestEntry.comparisonIsAbsolute
                  }}
                  datapointName={'dsa'} />
            }
            {template?.templateType === 'Numeric' &&
              <Title text={template.latestEntry.latestValue.toString()} />
            }
        </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  height: '100%',
  width: '100%',
  position: 'relative'
}

export const LineChartStyle: React.CSSProperties = {
  width: '100%',
  height: '100%'
}

export default GridElement
