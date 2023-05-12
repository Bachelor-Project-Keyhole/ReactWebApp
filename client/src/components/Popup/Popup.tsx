import * as React from 'react'
import { rgba } from 'polished'
import Button from '../Button'

export interface PopupProps {
  onClose: () => void
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Popup = ({ onClose, style, ...props }: PopupProps): JSX.Element => {
  return (
    <div style={overlayStyle}>
        <div style={{ ...wrapperStyles, ...style }}>
          <div style={{ position: 'absolute', top: 5, right: 5 }}>
            <Button text='Close' onClick={onClose}/>
          </div>
            {props.children}
        </div>
    </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  padding: '20px'
}

export const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 999,
  backgroundColor: rgba(0, 0, 0, 0.5)
  // backdrop-filter: blur(5px), /* Add blur effect */
}

export default Popup
