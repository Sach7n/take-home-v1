import React from 'react';
import {Card} from 'react-native-paper';
import {useAppContext} from '../context';

type FavoriteData = {
  name: string;
};

type Favorite = {
  data: FavoriteData;
};

const Faviroutes: React.FC<any> = () => {
  const {fav} = useAppContext();

  const uniqueFav: Favorite[] = fav.filter(
    (favorite: Favorite, index: number, self: Favorite[]) =>
      index === self.findIndex(f => f.data.name === favorite.data.name),
  );

  return (
    <>
      {uniqueFav.map((favorite: Favorite, index: number) => (
        <Card.Title key={index} title={favorite.data.name} />
      ))}
    </>
  );
};

export default Faviroutes;
