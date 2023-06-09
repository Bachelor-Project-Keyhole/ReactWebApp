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
          <div style={{ position: 'absolute', top: 20, right: 20 }}>
            <Button text='Close' onClick={onClose} style={{ ...dangerButtonStyle }} />
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
  width: 'auto',
  height: 'auto',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  padding: '20px',
  borderRadius: 5
}

export const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 999,
  backgroundColor: rgba(0, 0, 0, 0.5),
  // backdrop-filter: blur(5px), /* Add blur effect */
}

export const dangerButtonStyle: React.CSSProperties = {
  borderRadius: 5,
  border: '0px',
  backgroundColor: '#FF0000',
  color: 'white',
  height: '2vh'
}

export default Popup
