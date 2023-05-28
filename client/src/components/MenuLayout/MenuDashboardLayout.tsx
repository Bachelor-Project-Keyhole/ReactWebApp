import * as React from 'react'
import MenuCard from '../MenuCard'
import MenuCardList, { type MenuCardListProps } from '../MenuCardList/MenuCardList'

export interface MenuLayoutProps extends MenuCardListProps {
  style?: React.CSSProperties
  children?: React.ReactNode
}

const MenuLayout: React.FC<MenuLayoutProps> = ({ style, children, ...props }) => {
  return (
    <div style={style}>
      {children}
      <MenuCardList
        {...props}
      />
    </div>
  )
}

export default MenuLayout
