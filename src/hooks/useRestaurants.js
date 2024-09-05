import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

const useRestaurants = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (term) => {
    try {
      const response = await yelp.get('/search', {
        params: { limit: 50, term: term, location: 'san jose' },
      });
      setResults(response.data.businesses);
      setErrorMessage('');
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi('pasta');
  }, []);

  return [searchApi, results, errorMessage];
};

export default useRestaurants;
