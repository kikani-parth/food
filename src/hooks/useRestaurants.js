//useRestaurants.js

import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (term) => {
    try {
      const response = await yelp.get('/search', {
        params: { limit: 50, term: term, location: 'san jose' }, // limit === 50 (max)
      });
      setRestaurants(response.data.businesses);
      setErrorMessage('');
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi('pasta');
  }, []);

  return [searchApi, restaurants, errorMessage];
};

export default useRestaurants;
