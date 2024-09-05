import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRestaurants from '../hooks/useRestaurants';
import RestaurantsList from '../components/RestaurantsList';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchApi, results, errorMessage] = useRestaurants();

  const filterRestaurantsByPrice = (price) => {
    // price === '$' || '$$' || '$$$' || '$$$$'
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
        onSearchTermSubmit={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>Found: {results.length}</Text>
      <RestaurantsList
        results={filterRestaurantsByPrice('$')}
        title="Cost Effective"
      />
      <RestaurantsList
        results={filterRestaurantsByPrice('$$')}
        title="Bit Pricier"
      />
      <RestaurantsList
        results={filterRestaurantsByPrice('$$$')}
        title="Big Spender"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
