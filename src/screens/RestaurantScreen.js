import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import yelp from '../api/yelp';
import BackButton from '../components/BackButton';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Card from '../components/Card';

const RestaurantScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = navigation.getParam('id');

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`);
    setRestaurant(response.data);
  };

  useEffect(() => {
    getRestaurant(id);
  }, []);

  if (!restaurant) return null;

  console.log(restaurant.location.display_address);
  // Extract the restaurant address and join it into a single string
  const address = restaurant.location.display_address.join(', ');

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={restaurant.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => (
            <View style={[styles.imageContainer, { width: screenWidth }]}>
              <Image source={{ uri: item }} style={styles.imageStyle} />
              <View style={styles.dotContainer}>
                {restaurant.photos.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentIndex === index && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
              <BackButton
                size={30}
                color="white"
                styles={styles.backButtonStyle}
                navigation={navigation}
              />
            </View>
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          style={{ height: screenHeight * 0.5 }} // Set FlatList height to 50% of screen height
        />
        <Text style={styles.nameStyle}>{restaurant.name}</Text>
        <View style={styles.addressContainer}>
          <Ionicons
            name="location-sharp"
            size={22}
            color="red"
            style={styles.locationIconStyle}
          />
          <Text style={styles.addressStyle}>{address}</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Entypo name="old-phone" size={21} color="#6495ED" />
          <Text style={styles.phoneNumberStyle}>{restaurant.phone}</Text>
        </View>
        <View>
          <Card></Card>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
  },
  imageStyle: {
    height: '100%',
  },
  nameStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 15,
    color: '#ffffff',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeDot: {
    borderWidth: 1.5,
    borderColor: 'black',
  },
  backButtonStyle: {
    position: 'absolute',
    top: 40,
    left: 8,
    padding: 10,
  },
  locationIconStyle: {},
  addressContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 12,
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  addressStyle: {
    color: '#ffffff',
    marginLeft: 5,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 12,
    flexWrap: 'wrap',
  },
  phoneNumberStyle: { color: '#ffffff', marginLeft: 6 },
});

export default RestaurantScreen;
