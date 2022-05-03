import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AvatarContext } from '../../context/Avatar';

import './UserIcon.css'

export const UserIcon = ({ isNavIcon, givenUser }) => {
  const { avatars } = useContext(AvatarContext); 
  const activeUser = useSelector( state => state.session?.user );
  
  const user = givenUser || activeUser

  const avatar = avatars[user?.id]

  const styleObject = {
    backgroundImage:`url(${avatar?.imageUrl})`,
    backgroundColor: isNavIcon ? 'white' : avatar?.color,
    borderColor: isNavIcon ? avatar?.color : 'var(--main-button-border-color)'
  }

  return (
    <div className="user-icon" style={styleObject}>
    </div>
  )
} 
