import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

type CardItemProps = {
  name: string;
  label: string;
  desc: string;
  tech: React.ReactNode; // Assuming tech is a ReactNode
  img: string;
  link: string;
};

const CustomCard: React.FC<CardItemProps> = ({
  name,
  label,
  desc,
}: CardItemProps) => {

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{name ? name : label}</Title>
        <Paragraph>{desc}</Paragraph>
      </Card.Content>
      {/* <Card.Actions>
        <Button onPress={() => Linking.openURL(link)}>Open Link</Button>
      </Card.Actions> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: '2%',
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});

export default CustomCard;
