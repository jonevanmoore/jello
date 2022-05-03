
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { UserIcon } from '../UserIcon';

import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div className="nav-bar-left">
        <Link to='/boards' className='logo-link'>
          <img src='/static/logo-white.png' className='nav-bar-logo' />
        </Link>
        <div className="nav-bar-left-divider" />
        <Link to='/boards/new' className='create-board-link jello__wiggle'>
          Create Board
        </Link>
      </div>
      <div className="nav-bar-right">
        <Link to='/boards'>
          <UserIcon isNavIcon={true} />
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
