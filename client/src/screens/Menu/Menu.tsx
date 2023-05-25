import * as React from 'react';
import { useEffect } from 'react';
import MenuLayout from '../../components/MenuLayout';
import MenuCard from '../../components/MenuCard/MenuCard';
import { useNavigate } from 'react-router-dom';

const Menu = (): JSX.Element => {
  const navigate = useNavigate();

  const menuStyles: React.CSSProperties = {
    position: 'relative',
    background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden',
  };

  useEffect(() => {
    const bodyStyles: CSSStyleDeclaration = document.body.style;
    bodyStyles.margin = '0';
    bodyStyles.padding = '0';
    bodyStyles.overflowX = 'hidden';
  }, []);

  return (
    <MenuLayout onManageDashboardClick={() => navigate('/manage-dashboard')} style={menuStyles}>
      {/*  */}
    </MenuLayout>
  );
};

export default Menu;
