import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
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

interface ContinentOption {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [fetchedData, setFetchedData] = useState<Continent | null>(null);
  const navigation = useNavigation();

  const {loading, error, data} = useFetch<MyData>(
    'https://countries.trevorblades.com/graphql',
    getContinentQuery(selectedContinent),
    '',
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
        {continents.map(
          (
            continent: ContinentOption, // Specify ContinentOption type here
          ) => (
            <View key={continent.value} style={{width: '50%', padding: 1}}>
              <RadioButton.Item
                label={continent.label} // Change to 'label' property
                value={continent.value}
                status={
                  selectedContinent === continent.value
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleContinentSelection(continent.value)}
              />
            </View>
          ),
        )}
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
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{flex: 2.2}}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
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
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      {renderContinentSelection()}
      {renderData()}
    </View>
  );
};

export default Home;
