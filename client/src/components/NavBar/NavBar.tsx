import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavbarProps {
  links: { to: string; text: string }[];
  style?: React.CSSProperties;
}

const checkLoggedIn = () => {
    //!!! for now just return true, but implement logic to check if user is logged in
  let userStr = 'alex' //localStorage.getItem('user');
  if (userStr) {
    return true;
  } else {
    return false;
  }
};

const Navbar = ({ links, style }: NavbarProps): JSX.Element | null => {
  if (!checkLoggedIn()) {
    return null; // Return null to hide the Navbar when not logged in
  }

  const navbarStyle: React.CSSProperties = {
    backgroundColor: '#333',
    padding: '0',
    overflow: 'hidden',
    ...style,
  };

  const listItemStyle: React.CSSProperties = {
    float: 'left',
    borderRight: '1px solid #bbb',
    transition: 'background-color 0.3s ease',
  };

  const lastListItemStyle: React.CSSProperties = {
    ...listItemStyle,
    borderRight: 'none',
    float: 'right', 
  };

  const linkStyle: React.CSSProperties = {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const activeLinkStyle: React.CSSProperties = {
    backgroundColor: '#04AA6D',
  };

  const handleLinkHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLElement;
    target.style.backgroundColor = '#111';
  };

  const handleLinkHoverExit = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLElement;
    target.style.backgroundColor = '';
  };

  const handleLogout = () => {
    // !!!implement logout logic here
  };

  return (
    <nav style={navbarStyle}>
      <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
        {links.map((link, index) => (
          <li
            key={index}
            style={index === links.length - 1 ? lastListItemStyle : listItemStyle}
          >
            <NavLink
              to={link.to}
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkHoverExit}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
