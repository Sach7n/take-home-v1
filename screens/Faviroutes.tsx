import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {useAppContext} from '../context';

const Faviroutes: React.FC<any> = () => {
  const {fav} = useAppContext();

  return (
    <>
      {fav.map((favorite, index) => (
        <Text key={index}>{favorite.data.name}</Text>
      ))}
    </>
  );
};

export default Faviroutes;
