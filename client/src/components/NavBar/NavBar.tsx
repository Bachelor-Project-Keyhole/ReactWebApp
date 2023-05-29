import * as React from 'react';
import { NavLink } from 'react-router-dom';
import UserService from '../../contexts/Authentication/UserService';
import { useAuthServiceContext } from '../../contexts/Authentication/AuthService';
import ProtectedComponent from '../ProtectedComponent/ProtectedComponent'


export interface NavbarProps {
}

const checkLoggedIn = () => {
  let userStr = localStorage.getItem('user');
  if (userStr) {
    return true;
  } else {
    return false;
  }
}

const Navbar = ({ }: NavbarProps): JSX.Element | null => {
  let isLoggedIn = checkLoggedIn();
  const { logout } = useAuthServiceContext()

  const handleLinkHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLElement;
    target.style.backgroundColor = '#111';
    target.style.color = 'white'
  };

  const handleLinkHoverExit = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLElement;
    target.style.backgroundColor = '';
    target.style.color = 'black'
  };

  const handleLogout = () => {
    logout();
    isLoggedIn = false;
    window.location.reload();
  };

      return (
        <nav style={{ ...navbarStyle }}>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
            <ProtectedComponent requiredRole='Viewer'>
              <li style={{ ...listItemStyle }}>
                <NavLink to='/menu' style={{ ...linkStyle }}
                  onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit}  >Home</NavLink>
              </li>
            </ProtectedComponent>
            <ProtectedComponent requiredRole='Editor'>
              <li style={{ ...listItemStyle }}>
                  <NavLink to='/manage-datapoint' style={{ ...linkStyle }}
                    onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit} >Manage Datapoint</NavLink>
              </li>
            </ProtectedComponent>
            <ProtectedComponent requiredRole='Admin'>
              <li style={{ ...listItemStyle }}>
                <NavLink to='/manage-organization' style={{ ...linkStyle }}
                onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit}  >Manage Organization</NavLink>
              </li>
            </ProtectedComponent>
            <ProtectedComponent requiredRole='Viewer'>
              <li style={{ ...listItemStyle }}>
                <NavLink to='/profile' style={{ ...linkStyle }}
                onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit}  >Profile</NavLink>
              </li>
            </ProtectedComponent>
            <ProtectedComponent requiredRole='Viewer'>
              <li style={{ ...lastListItemStyle }}>
                <NavLink to='/' onClick={handleLogout} style={{ ...linkStyle }}
                  onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit}  >Logout</NavLink>
              </li>
            </ProtectedComponent>
            {!isLoggedIn &&
              <>
                <li style={{ ...listItemStyle }}>
                  <NavLink to='/' style={{ ...linkStyle }}
                    onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit}  >Home</NavLink>
                </li>
                <li style={{ ...lastListItemStyle }}>
                  <NavLink to='/login' style={{ ...linkStyle }} 
                    onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit} >Sign in</NavLink>
                </li>
                <li style={{ ...lastListItemStyle }}>
                  <NavLink to='/register' style={{ ...linkStyle }} 
                    onMouseOver={handleLinkHover} onMouseLeave={handleLinkHoverExit}>Register</NavLink>
                </li>
              </>
            }
          </ul>
        </nav>
      )
  }

const navbarStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '0',
  overflow: 'hidden',
  width: '100%'
}

const listItemStyle: React.CSSProperties = {
  float: 'left',
  borderRight: '1px solid #bbb',
  transition: 'background-color 0.3s ease'
}

const lastListItemStyle: React.CSSProperties = {
  transition: 'background-color 0.3s ease',
  borderLeft: '1px solid #bbb',
  float: 'right'
}

const linkStyle: React.CSSProperties = {
  display: 'block',
  color: 'black',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease'
}

export default Navbar
