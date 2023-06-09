import * as React from 'react'

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string
  style?: React.CSSProperties
  onClick?: () => void
  solid?: boolean
  icon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ icon, text, solid, style, onClick, type }: ButtonProps): JSX.Element => {
  return (
        <button style={{ ...buttonStyles, ...style }} onClick={onClick} type={type} >
            {icon}
            {text}
        </button>
  )
}

export interface ButtonStyles {
  icon: React.CSSProperties
  text: React.CSSProperties
}

export const buttonStyles: React.CSSProperties = {
  height: 24,
  width: 'auto'

}

export default Button
