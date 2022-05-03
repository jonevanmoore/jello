import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div>
      <button className='jello__wiggle logout__button red__button button__shine__short__red' onClick={onLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
