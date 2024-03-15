import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import useFetch from '../hooks/useFetch';
import {Button} from 'react-native-paper';
import CustomCard from '../components/card';
import {useAppContext} from '../context';
import {getCountryQuery} from '../components/Queries';

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

type CountryResponse = {
  country: {
    continent: Continent;
    currency: string;
    emoji: string;
    emojiU: string;
    languages: Language[];
    name: string;
    native: string;
    phone: string;
    states: State[];
  };
};

const Details: React.FC<CardContainerProps> = () => {
  const [fetchedData, setFetchedData] = useState<CountryResponse | null>(null);
  const {country} = useAppContext();

  const {loading, error, data} = useFetch<any>(
    'https://countries.trevorblades.com/graphql',
    getCountryQuery(country),
    country,
  );

  useEffect(() => {
    if (data) {
      setFetchedData(data.data);
    }
  }, [data, country]);

  const renderData = () => {
    if (loading) {
      return <Button loading={true}>Loading...</Button>;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    if (fetchedData && fetchedData.country) {
      return (
        <>
          <CustomCard {...fetchedData.country} country={country} />
        </>
      );
    }
    return null;
  };

  return <>{renderData()}</>;
};

export default Details;
