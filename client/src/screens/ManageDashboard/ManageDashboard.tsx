import * as React from 'react'
import DashboardGrid from '../../components/DashboardGrid/DashboardGrid'
import Block, { type BlockProps } from '../../components/Block/Block'
import GridElement from '../../components/GridElement'
import Button from '../../components/Button/Button'

export interface ManageDashboardProps {
  style?: React.CSSProperties
}

const ManageDashboard = ({ style }: ManageDashboardProps): JSX.Element => {
  // const [newGridElements, setNewGridElements] = React.useState(gridElements)
  // const [blocks, setBlocks] = React.useState<BlockProps[]>([]) // { x: 0, y: 0, width: 1, height: 1 }, { x: 2, y: 2, width: 2, height: 2 }
  const [draggedTemplate, setDraggedTemplateTemplate] = React.useState<any>({})// template

  const handleOnDragStart = React.useCallback((e: React.DragEvent, template: string, width: number, height: number): void => {
    const newtemplate = {
      text: template + width.toString() + height.toString(),
      spanHorizontal: height.toString(),
      spanVertical: width.toString(),
      component: <GridElement
          text={template + width.toString() + height.toString()}
          style={{
            height: '100%',
            width: '100%'
          }} />,
      blocked: false
    }
    setDraggedTemplateTemplate(newtemplate)
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

                <DashboardGrid draggedTemplate />
                <div style={{ width: 300, height: 400, backgroundColor: 'red', margin: 8 }}>
                  <div draggable onDragStart={(e) => { handleOnDragStart(e, 'Template1*1', 1, 1) }} style={{ height: 100, width: 100, backgroundColor: 'cyan' }}>
                    Template1*1
                  </div>
                </div>

            </div>
            <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button text='Save' onClick={() => {}} />
            <Button text='Cancel' onClick={() => {}} />
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
