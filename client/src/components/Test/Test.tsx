import * as React from 'react'
import { useState } from 'react'

interface Block {
  x: number
  y: number
  width: number
  height: number
}

const BlockComponent: React.FC<Block> = ({ x, y, width, height }) => {
  const style: React.CSSProperties = {
    gridColumn: `${x + 1} / span ${width}`,
    gridRow: `${y + 1} / span ${height}`,
    backgroundColor: 'red',
    border: '1px solid black'
  }

  return <div style={style} />
}

const Board: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([{ x: 0, y: 0, width: 2, height: 2 }
    // { x: 2, y: 2, width: 2, height: 2 }
  ])

  const handleResize = (index: number, newWidth: number, newHeight: number) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks]
      updatedBlocks[index] = { ...updatedBlocks[index], width: newWidth, height: newHeight }
      return updatedBlocks
    })
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        width: '400px',
        height: '200px'
      }}
    >
      {blocks.map((block, index) => (
        <BlockComponent key={index} {...block} />
      ))}
      {blocks.map((block, index) => (
        <ResizableBlock key={index} index={index} {...block} onResize={handleResize} />
      ))}
    </div>
  )
}

interface ResizableBlockProps extends Block {
  index: number
  onResize: (index: number, newWidth: number, newHeight: number) => void
}

const ResizableBlock: React.FC<ResizableBlockProps> = ({ index, x, y, width, height, onResize }) => {
  const handleMouseDown = (event: React.MouseEvent) => {
    const initialWidth = width
    const initialHeight = height
    const startX = event.clientX
    const startY = event.clientY

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX
      const deltaY = event.clientY - startY

      const newWidth = Math.max(1, initialWidth + Math.round(deltaX / 50))
      const newHeight = Math.max(1, initialHeight + Math.round(deltaY / 50))

      onResize(index, newWidth, newHeight)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      style={{
        gridColumn: `${x + 1} / span ${width}`,
        gridRow: `${y + 1} / span ${height}`,
        backgroundColor: 'transparent',
        border: '1px dashed black',
        zIndex: 1,
        cursor: 'se-resize'
      }}
      onMouseDown={handleMouseDown}
    />
  )
}

export default Board
