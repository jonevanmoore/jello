import { createContext } from 'react';

export const AvatarContext = createContext();

export const avatars = {
  1: { imageUrl: '/static/jello1.png', color: '#B3D035' },
  2: { imageUrl: '/static/jello2.png', color: '#F8AC1B' },
  3: { imageUrl: '/static/jello3.png', color: '#00AABF' },
  4: { imageUrl: '/static/jello4.png', color: '#B67BAB' },
  5: { imageUrl: '/static/jello5.png', color: '#30AAE1' },
  6: { imageUrl: '/static/jello6.png', color: '#F7AAB7' },
  7: { imageUrl: '/static/jello7.png', color: '#FDCF0B' },
  8: { imageUrl: '/static/jello8.png', color: '#74C7A7' },
  9: { imageUrl: '/static/jello9.png', color: '#9BADCC' },
  10: { imageUrl: '/static/jello10.png', color: '#F05C71' },
  11: { imageUrl: '/static/jello11.png', color: '#0A70BE' },
  12: { imageUrl: '/static/jello12.png', color: '#F68C54' },
}

export function AvatarProvider({ children }) {

  return (
    <AvatarContext.Provider value={{ avatars }}>
      {children}
    </AvatarContext.Provider>
  );

}
