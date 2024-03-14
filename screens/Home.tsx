import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {RadioButton, Button, Title} from 'react-native-paper';
import useFetch from '../hooks/useFetch';
import CardContainer from '../components/CardContainer';
import {continents} from '../constants/constants';
import {getContinentQuery} from '../components/Queries';
import {useNavigation} from '@react-navigation/native';

interface Country {
  name: string;
  code: string;
}

interface Continent {
  name: string;
  countries: Country[];
}

interface Data {
  continent: Continent;
}

interface MyData {
  data: Data;
}

const Home: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [fetchedData, setFetchedData] = useState<Continent | null>(null);
  const [fetchButtonClicked, setFetchButtonClicked] = useState<boolean>(false);
  const navigation = useNavigation();

  const {loading, error, data, refetch} = useFetch<MyData>(
    'https://countries.trevorblades.com/graphql',
    getContinentQuery(selectedContinent),
    fetchButtonClicked, // Dependency to trigger refetch
  );

  useEffect(() => {
    if (data) {
      setFetchedData(data.data.continent);
    }
  }, [data]);

  const handleContinentSelection = (continentCode: string) => {
    setSelectedContinent(continentCode);
  };

  const handleFavs = () => {
    navigation.navigate('Favs');
  };
  const handleReset = () => {
    setSelectedContinent('');
    setFetchButtonClicked(false); // Reset fetch button click state
  };

  const renderContinentSelection = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {continents.map(continent => (
          <View key={continent.value} style={{width: '50%', padding: 1}}>
            <RadioButton.Item
              label={continent.lable}
              value={continent.value}
              status={
                selectedContinent === continent.value ? 'checked' : 'unchecked'
              }
              key={continents.value}
              onPress={() => handleContinentSelection(continent.value)}
            />
          </View>
        ))}
        <Button
          mode="contained"
          onPress={handleReset}
          disabled={!selectedContinent}>
          Reset
        </Button>
        <Button mode="contained" onPress={handleFavs}>
          Faviroutes
        </Button>
      </View>
    );
  };

  const renderData = () => {
    if (loading) {
      return <Button loading={true}>Loading...</Button>;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    if (fetchedData) {
      return (
        <View style={{flex: 2.2}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Title>{fetchedData.name} </Title>
            <Title>Countries:</Title>
            <View>
              <CardContainer items={fetchedData.countries} />
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      {renderContinentSelection()}
      {renderData()}
    </View>
  );
};

export default Home;
