import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    marginRight: '20px',
    color: '#333',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease-in-out',
  };

  const linkHoverStyle = {
    ...linkStyle,
    backgroundColor: 'lightgrey',
  };

  const buttonStyles = {
    width: 100,
    height: 24,
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    border: '1px solid black',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 16,
  };

  return (
    <nav style={navbarStyle}>
      <div>
        <Link to="/" style={linkStyle} activeStyle={linkHoverStyle}>
          Home
        </Link>
        <Link to="/menu" style={linkStyle} activeStyle={linkHoverStyle}>
          Menu
        </Link>
        <Link to="/manage-datapoint" style={linkStyle} activeStyle={linkHoverStyle}>
          Manage Datapoint
        </Link>
        <Link to="/manage-organization" style={linkStyle} activeStyle={linkHoverStyle}>
          Manage Organization
        </Link>
      </div>
      <div>
        <button style={buttonStyles}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
