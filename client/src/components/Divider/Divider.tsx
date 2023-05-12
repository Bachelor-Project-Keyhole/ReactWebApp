import * as React from 'react'

export interface DividerProps {
  line?: boolean
  size?: number
}

const Divider = ({ line, size = 1, ...props }: any): JSX.Element => {
  return (
        <div style={{ margin: 16 * size }}>

        </div>
  )
}

export default Divider
