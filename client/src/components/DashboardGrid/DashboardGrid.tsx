import * as React from 'react'
import { useState } from 'react'
import GridElement from '../GridElement/GridElement'
import { padding } from 'polished'
import ResizableBlock from '../ResizableBlock/ResizableBlock'
import { set } from 'lodash'
import Block from '../Block'
import { type BlockProps } from '../Block/Block'
import { useTemplateContext, type ITemplate, type ITemplatePost } from '../../contexts/TemplateContext/TemplateContext'
import { type IDashboard, type IDashboardPlaceholder } from '../../contexts/DashboardContext/DashboardContext'

export interface DashboardGridProps {
  setNewTemplates: any
  newTemplates: any[]
  style?: React.CSSProperties
  dashboard: IDashboard
  draggedTemplate: ITemplatePost
  gridElements?: any[][]
}

const initialGridElements = [
  [
    {
      text: '1',
      spanHorizontal: '1',
      spanVertical: '1'
      // component: <GridElement text='1' style={{ height: '100%', width: '100%' }} />

    },
    {
      text: '2',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '3',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '4',
      spanHorizontal: '1',
      spanVertical: '1'
    }

  ],
  [
    {
      text: '5',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '6',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '7',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '8',
      spanHorizontal: '1',
      spanVertical: '1'
    }

  ],
  [
    {
      text: '9',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '10',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '11',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '12',
      spanHorizontal: '1',
      spanVertical: '1'
    }
  ],
  // finish the rest of the grid in one step
  [
    {
      text: '13',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '14',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '15',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '16',
      spanHorizontal: '1',
      spanVertical: '1'
    }
  ],
  [
    {
      text: '17',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '18',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '19',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '20',
      spanHorizontal: '1',
      spanVertical: '1'
    }

  ],
  [
    {
      text: '21',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '22',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '23',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '24',
      spanHorizontal: '1',
      spanVertical: '1'
    }

  ],
  [
    {
      text: '25',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '26',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '27',
      spanHorizontal: '1',
      spanVertical: '1'
      // blocked: true
    },
    {
      text: '28',
      spanHorizontal: '1',
      spanVertical: '1'
    }
  ],
  // finish the rest of the grid in one step
  [
    {
      text: '29',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '30',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '31',
      spanHorizontal: '1',
      spanVertical: '1'
    },
    {
      text: '32',
      spanHorizontal: '1',
      spanVertical: '1'
    }
  ]

]

const DashboardGrid = ({
  setNewTemplates,
  newTemplates,
  dashboard,
  gridElements = initialGridElements,
  draggedTemplate,
  style
}: DashboardGridProps): JSX.Element => {
  // probably need to store the coordinates and the size of the grid elements
  const [newDashboard, setNewDashboard] = React.useState<IDashboard>(dashboard)
  const [newGridElements, setNewGridElements] = React.useState(gridElements)
  const [blocks, setBlocks] = useState<BlockProps[]>([]) // { x: 0, y: 0, width: 1, height: 1 }, { x: 2, y: 2, width: 2, height: 2 }
  // const [newTemplates, setNewTemplates] = React.useState<ITemplate[]>([])
  const { createTemplate, updateTemplate, deleteTemplate, getTemplateById } = useTemplateContext()

  const handleOnTemplateDelete = React.useCallback(async (templateId: string) => {
    try {
      const tempBlocks = [...blocks]
      const index = tempBlocks.findIndex((block) => block.templateId === templateId)
      tempBlocks.splice(index, 1)
      setBlocks(tempBlocks)
      setNewDashboard({
        ...newDashboard,
        placeholders: newDashboard.placeholders.filter((placeholder) => placeholder.templateId !== templateId)
      })
      await deleteTemplate(templateId)
    } catch (err) {
      console.log(err)
    }
  }
  , [blocks, newDashboard])

  React.useEffect(() => {
    setNewDashboard(dashboard)
  }, [dashboard])

  React.useEffect(() => {
    const tempBlocks = new Array<any>()
    if (newDashboard) {
      newDashboard.placeholders.forEach((placeholder: IDashboardPlaceholder) => {
        tempBlocks.push({
          x: placeholder.positionWidth,
          y: placeholder.positionHeight,
          width: placeholder.sizeWidth,
          height: placeholder.sizeHeight,
          component:
          <GridElement
            onClose={
              () => {
                handleOnTemplateDelete(placeholder.templateId)
              }
            }
            text={placeholder.templateId}
            template={
              {
                templateId: placeholder.templateId,
                datapointEntries: placeholder.values,
                datapointId: '123',
                timeSpan: 0,
                displayType: placeholder.displayType,
                latestEntry: {
                  latestValue: placeholder.latestValue,
                  change: placeholder.change,
                  comparisonIsAbsolute: placeholder.comparison,
                  directionIsUp: placeholder.isDirectionUp
                },
                displayName: placeholder.displayName
              }
              }

            />
        })
      })
      setBlocks(tempBlocks)
    }
  }, [newDashboard])

  const handleOnDrop = React.useCallback(async (e: any, i: number, j: number) => {
    try {
      // console.log('BLOCK', draggedTemplate.templateId)
      // const tempArray = [...newGridElements]
      const tempNewTemplates = [...newTemplates]
      tempNewTemplates.push(draggedTemplate)
      setNewTemplates(tempNewTemplates)

      const draggedTemplateWithPosition = {
        ...draggedTemplate,
        positionWidth: i,
        positionHeight: j
      }
      console.log('DraggedTemplateyy', draggedTemplateWithPosition)
      const response = await createTemplate(draggedTemplateWithPosition)
      console.log('TEMPLATEUPDATERESOPNSE', response)
      const tempBlocks = [...blocks]
      tempBlocks.push({
        x: i,
        y: j,
        width: 1,
        height: 1,
        templateId: '123',
        component: <></>
      })
      setBlocks(tempBlocks)
      setNewDashboard(
        {
          ...newDashboard,
          placeholders: [
            ...newDashboard.placeholders,
            {
              positionWidth: i,
              positionHeight: j,
              sizeWidth: 1,
              sizeHeight: 1,
              templateId: '123',
              latestValue: 123,
              change: 123,
              comparison: true,
              isDirectionUp: true,
              values: [],
              datapointId: draggedTemplate.datapointId,
              displayName: draggedTemplate.displayName,
              displayType: draggedTemplate.displayType
            }
          ]
        }

      )
      return response
    } catch (error) {
      console.log(error)
    }
  }
  , [draggedTemplate, blocks])

  function handleDragOver (e: any): void {
    e.preventDefault()
    // increase the size of the element when enters the drop zone
  }

  const j = 0

  const handleResize = React.useCallback(async (index: number, newWidth: number, newHeight: number) => {
    const placeholder = dashboard.placeholders[index]
    // try {
    //   const tempTemplate: ITemplatePost = await getTemplateById(placeholder.templateId)
    //   tempTemplate.sizeWidth = newWidth
    //   tempTemplate.sizeHeight = newHeight
    //   const response = await updateTemplate(tempTemplate)
    // } catch (err) {
    //   console.log(err)
    // }

    setBlocks((prevBlocks: any) => {
      const updatedBlocks = [...prevBlocks]
      updatedBlocks[index] = { ...updatedBlocks[index], width: newWidth, height: newHeight }
      if (newWidth > 1 || newHeight > 1) {
        for (let k = 0; k < newWidth; k++) {
          for (let l = 0; l < newHeight; l++) {
            newGridElements[updatedBlocks[index].x + k][updatedBlocks[index].y + l].blocked = true
          }
        }
      }
      if (prevBlocks[index].width > newWidth || prevBlocks[index].height > newHeight) {
        for (let k = 0; k < prevBlocks[index].width; k++) {
          for (let l = 0; l < prevBlocks[index].height; l++) {
            newGridElements[updatedBlocks[index].x + k][updatedBlocks[index].y + l].blocked = false
          }
        }
      }
      return updatedBlocks
    })
  }, [blocks])

  return (
        <div style={{ ...wrapperStyles, ...style }}>
            <div style={{ ...innerStyles }}>
                {blocks.map((block, index) => (
                  <Block key={index} {...block} />
                ))}

                {blocks.map((block, index) => (
                  <ResizableBlock key={index} index={index} {...block} onResize={handleResize} />
                ))}

                {newGridElements.map((row, i) => {
                  return (
                    row[j].blocked !== true
                      ? (
                        <div key={i} style={{
                          gridArea: `${j + 1} / ${i + 1} / span ${row[j].spanVertical} / span ${row[j].spanHorizontal}`,
                          ...gridElementStyle
                        }} onDrop={(e) => { handleOnDrop(e, i, j) } }
                          onDragOver={ handleDragOver }
                          // onDragStart={(e) => { handleOnDragStart(e, 'Template2*2', 2, 2) }}
                          >
                          {row[j].component || row[j].text}
                        </div>
                        )

                      : (
                      <></>)
                  )
                })}
                {newGridElements.map((row, i) => {
                  return (
                    row[j + 1].blocked !== true
                      ? (
                        <div key={i} style={{
                          gridArea: `${j + 2} / ${i + 1} / span ${row[j + 1].spanVertical} / span ${row[j + 1].spanHorizontal}`,
                          ...gridElementStyle
                        }} onDrop={(e) => { handleOnDrop(e, i, j + 1) } } onDragOver={ handleDragOver }>
                          {row[j + 1].component || row[j + 1].text}
                                    </div>
                        )
                      : (
                      <></>)
                  )
                })}
                {newGridElements.map((row, i) => {
                  return (
                    row[j + 2].blocked !== true
                      ? (
                        <div key={i} style={{
                          gridArea: `${j + 3} / ${i + 1} / span ${row[j + 2].spanVertical} / span ${row[j + 2].spanHorizontal}`,
                          ...gridElementStyle
                        }} onDrop={(e) => { handleOnDrop(e, i, j + 2) } } onDragOver={ handleDragOver }>
                         {row[j + 2].component || row[j + 2].text}
                                    </div>
                        )
                      : (
                      <></>)

                  )
                })}
                {newGridElements.map((row, i) => {
                  return (
                        <div key={i} style={{
                          gridArea: `${j + 4} / ${i + 1} / span ${row[j + 3].spanVertical} / span ${row[j + 3].spanHorizontal}`,
                          ...gridElementStyle
                        }} onDrop={(e) => { handleOnDrop(e, i, j + 3) } } onDragOver={ handleDragOver }>
                          {row[j + 3].component || row[j + 3].text}
                                    </div>
                  )
                })}
            </div>
            <div>

            </div>

        </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '75vw',
  minWidth: '900px',
  maxHeight: '90vh',
  minHeight: '490px',
  aspectRatio: '8 / 4'
}

export const innerStyles: React.CSSProperties = {
  height: '100%',
  padding: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  aspectRatio: '8 / 4'
}

export const elementStyles: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: '1px dashed black',
  zIndex: 1,
  cursor: 'se-resize'
}

export const gridElementStyle: React.CSSProperties = {
  border: '2px dashed black',
  zIndex: 1,
  padding: 5,
  margin: 2,
  aspectRatio: '1 / 1'
}

export default DashboardGrid
