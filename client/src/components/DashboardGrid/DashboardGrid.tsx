import * as React from 'react'
import { useState } from 'react'
import GridElement from '../GridElement/GridElement'
import { padding } from 'polished'
import ResizableBlock from '../ResizableBlock/ResizableBlock'
import { set } from 'lodash'
import Block from '../Block'
import { type BlockProps } from '../Block/Block'

// interface Block {
//   x: number
//   y: number
//   width: number
//   height: number
//   component?: React.ReactNode
// }

// const BlockComponent: React.FC<Block> = ({ x, y, width, height, component }) => {
//   const style: React.CSSProperties = {
//     gridColumn: `${x + 1} / span ${width}`,
//     gridRow: `${y + 1} / span ${height}`,
//     backgroundColor: 'red',
//     border: '1px solid black'
//   }

//   return (
//     <div style={style} >
//       {component}
//     </div>
//   )
// }

export interface DashboardGridProps {
  style?: React.CSSProperties
  // gridElements?: React.ReactNode[][]
  draggedTemplate: any
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
  gridElements = initialGridElements,
  draggedTemplate,
  style
}: DashboardGridProps): JSX.Element => {
  // probably need to store the coordinates and the size of the grid elements
  // const [newGridElements, setNewGridElements] = React.useState(Array.from({ length: 8 }, () => Array.from({ length: 4 }, () => null)))
  const [newGridElements, setNewGridElements] = React.useState(gridElements)
  // const [draggedTemplate, setDraggedTemplateTemplate] = React.useState<any>({})// template

  const [onHover, setOnHover] = React.useState(false)
  const [onDrop, setOnDrop] = React.useState(false)
  const [heightOfTemplate, setHeightOfTemplate] = React.useState<number>(0)
  const [widthOfTemplate, setWidthOfTemplate] = React.useState<number>(0)
  const [blocks, setBlocks] = useState<BlockProps[]>([]) // { x: 0, y: 0, width: 1, height: 1 }, { x: 2, y: 2, width: 2, height: 2 }

  // const handleOnDragStart = React.useCallback((e: React.DragEvent, template: string, width: number, height: number): void => {
  //   // e.dataTransfer.setData('template', template)
  //   const newtemplate = {
  //     text: template + width.toString() + height.toString(),
  //     spanHorizontal: height.toString(),
  //     spanVertical: width.toString(),
  //     component: <GridElement
  //       text={template + width.toString() + height.toString()}
  //       style={{
  //         height: '100%',
  //         width: '100%'
  //       }} />,
  //     blocked: false
  //   }
  //   setDraggedTemplateTemplate(newtemplate)
  // }
  // , [])

  const handleOnDrop = React.useCallback((e: any, i: number, j: number): void => {
    console.log('drop', i, j)

    const tempArray = [...newGridElements]
    const tempBlocks = [...blocks]
    tempBlocks.push({
      x: i,
      y: j,
      width: 1,
      height: 1,
      component:
        <GridElement
          text={draggedTemplate.text}
          style={{
            height: '100%',
            width: '100%'
          }} />
    })
    setBlocks(tempBlocks)

    // This will be removed when the resize is done
    // if (draggedTemplate.spanHorizontal > 1 || draggedTemplate.spanVertical > 1) {
    //   for (let k = 0; k < draggedTemplate.spanHorizontal; k++) {
    //     for (let l = 0; l < draggedTemplate.spanVertical; l++) {
    //       tempArray[i + k][j + l].blocked = true
    //     }
    //   }
    // }
    setNewGridElements(tempArray)
  }
  , [newGridElements, draggedTemplate])

  function handleDragOver (e: any): void {
    e.preventDefault()
    // increase the size of the element when enters the drop zone
  }

  // needs a solution for the grid elements bigger than 1x1. Probably need
  // to store the coordinates and the size of the grid elements
  // and if a grid element is bigger than 1x1, the other covered coordinates
  // will be changed to blocked state

  const j = 0

  const handleResize = (index: number, newWidth: number, newHeight: number) => {
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
  }

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

                {/* <div style={{
                  // gridArea: 'a ',
                  gridColumn: '1',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '2',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '3',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '4',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '5',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '6',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '7',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '8',
                  gridRow: '1',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '1',
                  gridRow: '2',
                  ...gridElementStyle
                }} />
                <div style={{
                  gridColumn: '2',
                  gridRow: '2',
                  ...gridElementStyle
                }} /> */}

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
  // width: '100%',
  // height: '100%',
  width: '800px',
  height: '400px',
  backgroundColor: '#f1f100'
}

export const innerStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  // gridTemplateAreas: `
  //   "1 2 3 4 5 6 7 8"
  //   "9 10 11 12 13 14 15 16"
  //   "17 18 19 20 21 22 23 24"
  //   "25 26 27 28 29 30 31 32"
  // `,
  // gridTemplateAreas: `
  //   "a b c d e f g h"
  //   "i j k l m n o p"
  //   "q r s t u v w x"
  //   "y z aa bb cc dd ee ff"
  // `,
  backgroundColor: '#f1f5a1'
}

export const elementStyles: React.CSSProperties = {
  // display: 'flex',
  // flexDirection: 'column',
  // width: '12.5%'
  // gridColumn: '1 / span 1',
  // gridRow: '1 / span 1',
  backgroundColor: 'transparent',
  border: '1px dashed black',
  zIndex: 1,
  cursor: 'se-resize'
}

export const gridElementStyle: React.CSSProperties = {
  // gridColumn: '1 / span 1',
  // gridRow: '1 / span 1',
  // backgroundColor: 'red',
  border: '1px dashed black',
  zIndex: 1,
  // cursor: 'se-resize',
  padding: 5,
  margin: 2
  // height: '12.5%',
  // width: '25%'
}

export default DashboardGrid
