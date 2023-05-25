import * as React from 'react'

export interface UpArrowIconProps {
    size: number,
    color: string
}

const UpArrowIcon = ({ size, color }: UpArrowIconProps) => {
  const height = (Math.sqrt(3) / 2) * size; // Calculate the height based on the size

  return (
    <svg
      viewBox={`0 0 ${size} ${height}`}
      fill={color}
      height={height}
      width={size}
    >
      <path d={`M0 ${height} L${size / 2} 0 L${size} ${height} Z`} />
    </svg>
  )
}

export default UpArrowIcon