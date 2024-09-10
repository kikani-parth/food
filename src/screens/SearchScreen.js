// SearchScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import useRestaurants from '../hooks/useRestaurants';
import RestaurantsList from '../components/RestaurantsList';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchApi, restaurants, errorMessage] = useRestaurants();

  const filterRestaurantsByPrice = (price) => {
    // price === '$' || '$$' || '$$$' || '$$$$'
    return restaurants.filter((restaurant) => {
      return restaurant.price === price;
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/header.jpg')}
          style={styles.imageStyle}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Discover Local Delights</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
            onSearchTermSubmit={() => searchApi(searchTerm)}
          />
        </View>
      </View>

      {errorMessage ? (
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      ) : null}
      <ScrollView>
        <RestaurantsList
          restuarants={filterRestaurantsByPrice('$')}
          title="Cost Effective ($)"
        />
        <RestaurantsList
          restuarants={filterRestaurantsByPrice('$$')}
          title="Bit Pricier ($$)"
        />
        <RestaurantsList
          restuarants={filterRestaurantsByPrice('$$$')}
          title="Big Spender ($$$)"
        />
        <RestaurantsList
          restuarants={filterRestaurantsByPrice('$$$$')}
          title="Exquisite ($$$$)"
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    position: 'relative',
  },
  imageStyle: {
    width: '100%',
    height: 300,
  },
  headingContainer: {
    position: 'absolute',
    top: 30,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default SearchScreen;
