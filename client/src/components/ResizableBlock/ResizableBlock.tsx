import * as React from 'react'
import { useState } from 'react'

interface Block {
  x: number
  y: number
  width: number
  height: number
}

// const BlockComponent: React.FC<Block> = ({ x, y, width, height }) => {
//   const style: React.CSSProperties = {
//     gridColumn: `${x + 1} / span ${width}`,
//     gridRow: `${y + 1} / span ${height}`
//     // backgroundColor: 'red',
//     // border: '1px solid black'
//   }

//   return <div style={style} />
// }

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
      const deltaX = event.clientX - startX / width
      const deltaY = event.clientY - startY / height
      console.log('DELTA X' + deltaX.toString() + 'DELTA Y' + deltaY.toString())

      const newWidth = Math.max(1, initialWidth + Math.round(deltaX / (100 * width)))
      // console.log('NEW WIDTH', newWidth)

      const newHeight = Math.max(1, initialHeight + Math.round(deltaY / (100 * height)))

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

export default ResizableBlock
