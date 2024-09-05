import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRestaurants from '../hooks/useRestaurants';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchApi, results, errorMessage] = useRestaurants();

  return (
    <View>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
        onSearchTermSubmit={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>Found: {results.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
