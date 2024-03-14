import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../context';

type Language = {
  name: string;
  native: string;
};

type State = {
  name: string;
};

type Continent = {
  name: string;
};

type CardItemProps = {
  name: string;
  label: string;
  currency: string;
  continent: Continent;
  native: string;
  phone: string;
  states: State[];
  languages: Language[];
  country: string | null;
  code: string;
};

const CustomCard: React.FC<CardItemProps> = ({
  name,
  label,
  currency,
  continent,
  native,
  phone,
  states,
  languages,
  country,
  code,
}: CardItemProps) => {
  const navigation = useNavigation();
  const {setCountry, fav, setFav, test} = useAppContext();
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useEffect(() => {
    const division = country && !!country.trim() ? 1 : 6;
    const {height} = Dimensions.get('window');
    setCardHeight(height / division); // Set initial height for the card
  }, []);

  const handleContinentSelection = () => {
    setCountry(code);
    navigation.navigate('Details');
  };

  const handleAddToFavorites = () => {
    setFav((prevFav) => [...prevFav, { data: { name } }]);
  };

  const renderCountrySelection = () => {
    return (
      <>
        <Text variant="titleMedium">Currency: {currency}</Text>
        <Text variant="titleMedium">Continent: {continent.name}</Text>
        <Text variant="titleMedium">Native: {native}</Text>
        <Text variant="titleMedium">Phone: {phone}</Text>
        <Text variant="titleMedium">Number of states: {states.length}</Text>
        <Text variant="titleMedium">Languages:</Text>
        {languages.map((l, index) => (
          <View key={index}>
            <Text variant="titleMedium">name: {l.name}</Text>
            <Text variant="titleMedium">native: {l.native}</Text>
          </View>
        ))}
        <Button mode="contained" onPress={handleAddToFavorites}>
          Add to Faviroutes
        </Button>
      </>
    );
  };

  return (
    <Card style={[styles.card, {height: cardHeight}]}>
      <Card.Title title={name ? name : label} titleVariant="titleLarge" />
      <Card.Content>
        {country && !!country.trim() ? renderCountrySelection() : null}
        {!country && (
          <Button onPress={handleContinentSelection}>View more</Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd', // Light gray border color
    backgroundColor: '#fff', // White background color
    elevation: 2, // Shadow depth for Android
  },
});

export default CustomCard;
