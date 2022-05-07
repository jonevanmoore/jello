import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearBoards } from '../../store/boards';
import './LogoutButton.css';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearBoards());
  };

  return (
    <div>
      <button
        id='logout-button'
        className='
        jello__wiggle
        logout__button
        red__button
        button__shine__short__red
        '
        onClick={onLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
