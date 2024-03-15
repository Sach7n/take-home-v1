import {useState, useEffect} from 'react';

type FetchDataResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

function useFetch<T>(
  url: string,
  query: string,
  country: string,
): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({query}),
        });
        if (!response.ok) {
          throw new Error('problem fetching the data from API');
        }
        const jsonData: T = await response.json();
        setData(jsonData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorState(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, query, country]);

  return {data, loading, error: errorState};
}

export default useFetch;
