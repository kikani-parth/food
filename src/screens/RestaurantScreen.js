import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const RestaurantScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);

  const id = navigation.getParam('id');

  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`);
    setRestaurant(response.data);
  };

  useEffect(() => {
    getRestaurant(id);
  }, []);

  if (!restaurant) return null;

  return (
    <View>
      <Text style={styles.nameStyle}>{restaurant.name}</Text>
      <FlatList
        data={restaurant.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={styles.imageStyle} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 200,
    margin: 10,
    borderRadius: 5,
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default RestaurantScreen;
