import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-paper';

interface Country {
  name: string;
}

interface CardContainerProps {
  items: Country[]; // Array of country objects
}

const CardContainer: React.FC<CardContainerProps> = ({items}) => {
  const renderCard = ({item}: {item: Country}) => (
    <Card style={{margin: 8, width: '45%'}}>
      <Card.Content>
        <Text>{item.name}</Text>
      </Card.Content>
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
