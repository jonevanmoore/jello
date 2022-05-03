import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AvatarContext } from '../../context/Avatar';

import './UserIcon.css'


/* TO USE THIS COMPONENT
in the NavBar: <UserIcon isNavIcon={true} />

as a sharing indicator: <UserIcon givenUser={ userObject } >
where userObject has an avatar_id
*/
export const UserIcon = ({ isNavIcon, givenUser }) => {
  const { avatars } = useContext(AvatarContext); 
  const activeUser = useSelector( state => state.session?.user );
  
  // in the NavBar, we don't provide a user, so this uses session user
  const user = givenUser || activeUser;

  const avatar = avatars[user?.avatar_id]

  const styleObject = {
    backgroundImage:`url(${avatar?.imageUrl})`,
    backgroundColor: isNavIcon ? 'white' : avatar?.color,
    borderColor: isNavIcon ? avatar?.color : 'var(--create-board-button-main-color)'
  }

  return (
    <div className="user-icon" style={styleObject} />
  )
} 
