import * as React from 'react';
import MenuCard, { MenuCardProps } from '../MenuCard/MenuCard';

export interface MenuCardListProps {
  cards: MenuCardProps[];
}

const MenuCardList: React.FC<MenuCardListProps> = ({ cards }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 50, }}>
        {cards.map((card, index) => (
          <MenuCard key={index} {...card} />
        ))}
      </div>
    );
  };

export default MenuCardList;
