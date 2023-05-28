import * as React from 'react'
import MenuCard, { type MenuCardProps } from '../MenuCard/MenuCard'

export interface MenuCardListProps {
  cards: MenuCardProps[]
  onClick: (index: number) => void
}

const MenuCardList: React.FC<MenuCardListProps> = ({ cards, onClick }) => {
  return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 50 }}>
        {cards.map((card, index) => (
          <MenuCard key={index} onClick={() => { onClick(index) }} {...card} />
        ))}
      </div>
  )
}

export default MenuCardList
