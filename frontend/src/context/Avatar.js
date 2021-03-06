import { createContext } from 'react';
import './Avatar.css';

export const AvatarContext = createContext();

export const avatars = {
  1: { imageUrl: '/static/jello1.png', color: '#B3D035', fontColor: '#035B2F', highlightColor: '#EBE716' },
  2: { imageUrl: '/static/jello2.png', color: '#F8AC1B', fontColor: '#BE3227', highlightColor: '#FBEF65' },
  3: { imageUrl: '/static/jello3.png', color: '#00AABF', fontColor: '#1F2858', highlightColor: '#A6DCDE' },
  4: { imageUrl: '/static/jello4.png', color: '#B67BAB', fontColor: '#3A1B59', highlightColor: '#D4AED2' },
  5: { imageUrl: '/static/jello5.png', color: '#30AAE1', fontColor: '#12426D', highlightColor: '#99DBF9' },
  6: { imageUrl: '/static/jello6.png', color: '#F7AAB7', fontColor: '#A61E5C', highlightColor: '#FAC9CB' },
  7: { imageUrl: '/static/jello7.png', color: '#FDCF0B', fontColor: '#CD3827', highlightColor: '#FDF391' },
  8: { imageUrl: '/static/jello8.png', color: '#74C7A7', fontColor: '#005A50', highlightColor: '#B8DFCB' },
  9: { imageUrl: '/static/jello9.png', color: '#9BADCC', fontColor: '#20426A', highlightColor: '#CAD9EF' },
  10: { imageUrl: '/static/jello10.png', color: '#F05C71', fontColor: '#931930', highlightColor: '#F7A8B5' },
  11: { imageUrl: '/static/jello11.png', color: '#0A80BE', fontColor: '#23215B', highlightColor: '#4DBEE6' },
  12: { imageUrl: '/static/jello12.png', color: '#F68C54', fontColor: '#781514', highlightColor: '#FDC99A' },
}

export function AvatarProvider({ children }) {

  return (
    <AvatarContext.Provider value={{ avatars }}>
      {children}
    </AvatarContext.Provider>
  );

}
