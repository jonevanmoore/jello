import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { UserIcon } from '../UserIcon';
import Modal from '../Modal';
import NewBoardForm from '../boards/NewBoardForm';

import './NavBar.css'

const NavBar = () => {
  const [ showModal, setShowModal ] = useState(false);

  const closeModalFunc = () => setShowModal(false);
  const showModalFunc = () => setShowModal(true);

  return (
    <nav>
      <div className="nav-bar-left">
        <Link to='/boards' className='logo-link'>
          <img src='/static/Jello-White-Logo.png' className='nav-bar-logo' />
        </Link>
        <div className="nav-bar-left-divider" />
        <div className='create-board-link jello__wiggle' onClick={showModalFunc}>
          Create Board
        </div>
        {showModal && (
          <Modal closeModalFunc={closeModalFunc}>
            <NewBoardForm closeModalFunc={closeModalFunc} />
          </Modal>
        )}

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
