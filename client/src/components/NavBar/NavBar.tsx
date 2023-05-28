import * as React from 'react';
import { NavLink } from 'react-router-dom';
import UserService from '../../contexts/Authentication/UserService';
import { useAuthServiceContext } from '../../contexts/Authentication/AuthService';


export interface NavbarProps {
  links: { to: string; text: string }[];
  notLoggedInlinks: { to: string; text: string }[];
  style?: React.CSSProperties;
}

const checkLoggedIn = () => {
  let userStr = localStorage.getItem('user');
  if (userStr) {
    return true;
  } else {
    return false;
  }
};

const Navbar = ({ links, notLoggedInlinks, style }: NavbarProps): JSX.Element | null => {
  let isLoggedIn = checkLoggedIn();
  const linksToShow = isLoggedIn ? links : notLoggedInlinks;
  const { logout } = useAuthServiceContext()

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
    borderLeft: '1px solid #bbb',
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
    logout();
    isLoggedIn = false;
    window.location.reload();
  };

  const getUserRole = () => {
    return UserService.getUserRole(UserService.getCurrentUser().user.roles);
  };

  // const showNavbar = () => {
  //   if (isLoggedIn) {
  //     let role = getUserRole();
  //     return (
  //       <nav style={navbarStyle}>
  //         <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
  //           {linksToShow.map((link, index) => (
  //             //hide if manage org if not admin
  //             //(role !== 'Admin' && link.to === '/manage-organization'   &&

  //             <li
  //               key={index}
  //               style={
  //                 index >= linksToShow.length - 1
  //                   ? lastListItemStyle
  //                   : { ...listItemStyle, float: 'left' }
  //               }
  //             >
  //               <NavLink
  //                 to={link.to}
  //                 style={linkStyle}
  //                 onMouseEnter={handleLinkHover}
  //                 onMouseLeave={handleLinkHoverExit}
  //                 onClick={link.to === '/' ? handleLogout : () => {}}
  //               >
  //                 {link.text}
  //               </NavLink>
  //             </li>
  //             )
  //           )}
  //         </ul>
  //       </nav>
  //     );
  //   } else {
  //     return (
  //       <nav style={navbarStyle}>
  //         <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
  //           {linksToShow.map((link, index) => (
  //             <li key={index} style={lastListItemStyle}>
  //               <NavLink
  //                 to={link.to}
  //                 style={linkStyle}
  //                 onMouseEnter={handleLinkHover}
  //                 onMouseLeave={handleLinkHoverExit}
  //                 onClick={link.to === '/' ? handleLogout : () => {}}
  //               >
  //                 {link.text}
  //               </NavLink>
  //             </li>
  //           ))}
  //         </ul>
  //       </nav>
  //     );
  //   }
  // };

  const showNavbar = () => {
    if (isLoggedIn) {
      let role = getUserRole();
      return (
        <nav style={navbarStyle}>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
            {linksToShow.map((link, index) => {
              // Hide "manage-organization" if not admin
              if (role !== 'Admin' && link.to === '/manage-organization') {
                return null;
              }
  
              return (
                <li
                  key={index}
                  style={
                    index >= linksToShow.length - 1
                      ? lastListItemStyle
                      : { ...listItemStyle, float: 'left' }
                  }
                >
                  <NavLink
                    to={link.to}
                    style={linkStyle}
                    onMouseEnter={handleLinkHover}
                    onMouseLeave={handleLinkHoverExit}
                    onClick={link.to === '/' ? handleLogout : () => {}}
                  >
                    {link.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      );
    } else {
      return (
        <nav style={navbarStyle}>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
            {linksToShow.map((link, index) => (
              <li key={index} style={lastListItemStyle}>
                <NavLink
                  to={link.to}
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkHoverExit}
                  onClick={link.to === '/' ? handleLogout : () => {}}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      );
    }
  };
  
  
  return showNavbar();


};

export default Navbar;
