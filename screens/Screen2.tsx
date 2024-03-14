import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import useFetch from '../hooks/useFetch';


const Screen2: React.FC<CardContainerProps> = () => {
  const [fetchedData, setFetchedData] = useState<Continent | null>(null);
  
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


  return (
    <>
      <Text>Hello from screen 2</Text>
    </>
  );
};

export default Screen2;
