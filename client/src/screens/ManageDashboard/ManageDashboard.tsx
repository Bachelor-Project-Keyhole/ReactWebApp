import * as React from 'react'
import DashboardGrid from '../../components/DashboardGrid/DashboardGrid'
import Block, { type BlockProps } from '../../components/Block/Block'
import GridElement from '../../components/GridElement'
import Button from '../../components/Button/Button'
import TemplateCreator from '../../components/TemplateCreator/TemplateCreator'
import { initialTemplate, type ITemplate } from '../../contexts/TemplateContext/TemplateContext'
import { type IDashboard, useDashboardContext, initialDashboard } from '../../contexts/DashboardContext/DashboardContext'

export interface ManageDashboardProps {
  style?: React.CSSProperties
}

const ManageDashboard = ({ style }: ManageDashboardProps): JSX.Element => {
  // const [newGridElements, setNewGridElements] = React.useState(gridElements)
  // const [blocks, setBlocks] = React.useState<BlockProps[]>([]) // { x: 0, y: 0, width: 1, height: 1 }, { x: 2, y: 2, width: 2, height: 2 }
  const [draggedTemplate, setDraggedTemplateTemplate] = React.useState<ITemplate>(initialTemplate)// template
  const { loadDashboard } = useDashboardContext()
  const [dashboard, setDashboard] = React.useState<IDashboard>(initialDashboard)

  const handleLoadDashboard = React.useCallback(async (dashboardId: string) => {
    try {
      const response = await loadDashboard(dashboardId)
      setDashboard(response)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  React.useEffect(() => {
    // handleLoadDashboard('5f9e9b0b1c9d440000d3b0a0')
    // Dummy data
    setDashboard({
      dashboardId: '5f9e9b0b1c9d440000d3b0a0',
      dashboardName: 'Dashboard 1',
      placeholders: [
        {
          positionHeight: 0,
          positionWidth: 0,
          sizeHeight: 1,
          sizeWidth: 1,
          templateId: '5f9e9b0b1c9d440000d3b0a0',
          values: [
            {
              value: 0,
              time: '2020-10-30T12:00:00.000Z'
            }
          ],
          change: 0,
          comparison: true,
          latestValue: 0,
          isDirectionUp: true
        }
      ]
    })
  }, [setDashboard])

  const handleOnDragStart = React.useCallback((e: React.DragEvent, newTemplate: ITemplate): void => {
    // const newtemplate = {
    //   text: 'asd',
    //   // spanHorizontal: height.toString(),
    //   // spanVertical: width.toString(),
    //   component: <GridElement
    //       text={'Text'}
    //       style={{
    //         height: '100%',
    //         width: '100%'
    //       }} />,
    //   blocked: false
    // }

    setDraggedTemplateTemplate(newTemplate)
  }
  , [])

  // const handleOnDrop = React.useCallback((e: any, i: number, j: number): void => {
  //   console.log('drop', i, j)

  //   // setDraggedTemplateTemplate(e.dataTransfer.getData('template'))
  //   // console.log('drop', e.dataTransfer.getData('template'))

  //   const tempArray = [...newGridElements]
  //   const tempBlocks = [...blocks]
  //   tempBlocks.push({
  //     x: i,
  //     y: j,
  //     width: 1,
  //     height: 1,
  //     component:
  //       <GridElement
  //         text={draggedTemplate.text}
  //         style={{
  //           height: '100%',
  //           width: '100%'
  //         }} />
  //   })
  //   setBlocks(tempBlocks)
  //   setNewGridElements(tempArray)
  // }
  // , [newGridElements, draggedTemplate])

  return (
        <div style={{ ...wrapperStyles, ...style }}>
          Manage Dashboard
            <div style={{ ...innerStyles }}>

                <DashboardGrid
                  dashboard={dashboard}
                  draggedTemplate={draggedTemplate} />
                <div style={{ padding: 8 }}>
                  <div>
                   <TemplateCreator handleOnDragStart={handleOnDragStart}/>
                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button text='Save' onClick={() => {}} />
                    <Button text='Cancel' onClick={() => {}} />
                  </div>
                  </div>
                </div>

            </div>

        </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '80vh',
  // padding: 8,
  backgroundColor: '#f1f1f1'
}

export const innerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  margin: 16

  // padding: '10px'
}

export default ManageDashboard
