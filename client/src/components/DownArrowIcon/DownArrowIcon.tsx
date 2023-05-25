import * as React from 'react'

export interface DownArrowIconProps {
    size: number,
    color: string
}

const DownArrowIcon = ({ size, color }: DownArrowIconProps) => {
    const height = (Math.sqrt(3) / 2) * size; // Calculate the height based on the size
  
    return (
      <svg
        viewBox={`0 0 ${size} ${height}`}
        fill={color}
        height={height}
        width={size}
      >
        <path d={`M0 0 L${size / 2} ${height} L${size} 0 Z`} />
      </svg>
    )
  }

  export default DownArrowIcon
