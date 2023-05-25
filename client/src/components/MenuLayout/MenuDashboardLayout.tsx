import * as React from 'react';
import MenuCard from '../MenuCard';
import MenuCardList from '../MenuCardList/MenuCardList';

export interface MenuLayoutProps {
  onManageDashboardClick: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}



const MenuLayout: React.FC<MenuLayoutProps> = ({ onManageDashboardClick, style, children }) => {
  const cards=[
    {
      title: 'Dashboard 1',
      lastModified: 'Last modified on 23-05-2023',
      description: 'Description of Dashboard 1',
      nextPageUrl: 'http://localhost:8080/manage-organization',
    },
    {
      title: 'Dashboard 2',
      lastModified: 'Last modified on 16-05-2023',
      description: 'Description of Dashboard 2',
      nextPageUrl: 'http://localhost:8080/manage-organization',
    },
    {
      title: 'Dashboard 3',
      lastModified: 'Last modified on 03-05-2023 by John Doe',
      description: 'Description of Dashboard 3',
      nextPageUrl: 'http://localhost:8080/manage-organization',
    },
    {
      title: 'Create new Dashboard',
      nextPageUrl: 'http://localhost:8080/manage-organization',
    },
  ];

  return (
    <div style={style}>
      {children}
      <MenuCardList
        cards={cards}
      />
    </div>
  );
};

export default MenuLayout;
