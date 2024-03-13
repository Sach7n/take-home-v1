import React, {useState, useEffect} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import useFetch from '../hooks/useFetch';
import CardContainer from '../components/CardContainer';

interface Country {
  name: string;
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

  const queryTemplate = `
    query Query {
      continent(code: "${selectedContinent}") {
        countries {
          name
        }
        name
      }
    }
  `;

  const {loading, error, data, refetch} = useFetch<MyData>(
    'https://countries.trevorblades.com/graphql',
    queryTemplate,
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

  const handleReset = () => {
    setSelectedContinent('');
    setFetchButtonClicked(false); // Reset fetch button click state
  };

  const renderContinentSelection = () => {
    return (
      <>
        <RadioButton.Item
          label="Europe (EU)"
          value="EU"
          status={selectedContinent === 'EU' ? 'checked' : 'unchecked'}
          onPress={() => handleContinentSelection('EU')}
        />
        <RadioButton.Item
          label="South America (SA)"
          value="SA"
          status={selectedContinent === 'SA' ? 'checked' : 'unchecked'}
          onPress={() => handleContinentSelection('SA')}
        />
        {/* Add more continents as needed */}
      </>
    );
  };

  const renderData = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    if (fetchedData) {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 0.9}}>
            <Text>Continent: {fetchedData.name} </Text>
            <Text>Countries:</Text>
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {renderContinentSelection()}
      <Button
        title="Reset"
        onPress={handleReset}
        disabled={!selectedContinent}
      />
      {renderData()}
    </View>
  );
};

export default Home;
