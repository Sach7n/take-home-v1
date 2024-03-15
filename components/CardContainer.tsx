import React from 'react';
import {FlatList} from 'react-native';
import {Card} from 'react-native-paper';
import CustomCard from './card';

interface Country {
  name: string;
}

interface CardContainerProps {
  items: Country[];
}

const CardContainer: React.FC<CardContainerProps> = ({items}) => {
  const renderCard = ({item}: {item: Country}) => (
    <Card style={{margin: 8, width: '45%'}}>
      <CustomCard {...item} />
    </Card>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderCard}
      numColumns={2}
      keyExtractor={(item, index) => item.name + index.toString()}
    />
  );
};

export default CardContainer;
