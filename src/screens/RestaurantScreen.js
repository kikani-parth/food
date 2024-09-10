import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import yelp from '../api/yelp';
import BackButton from '../components/BackButton';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Card from '../components/Card';
import formatHours from '../utils/formatHours';

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

  // Extract the restaurant address and join it into a single string
  const address = restaurant.location.display_address.join(', ');

  const hours = formatHours(restaurant.hours || []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          style={{ height: screenHeight * 0.55 }} // Set FlatList height to 55% of screen height
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
        <View style={styles.infoContainer}>
          <Card
            title="Reviews"
            content={`${restaurant.review_count} reviews`}
            styles={{
              cardContainer: styles.cardContainer,
              cardTitle: styles.cardTitle,
              cardContent: styles.cardContent,
            }}
          />
          <Card
            title="Rating"
            content={`${restaurant.rating} stars`}
            styles={{
              cardContainer: styles.cardContainer,
              cardTitle: styles.cardTitle,
              cardContent: styles.cardContent,
            }}
          />
          {restaurant.transactions.length > 0 ? (
            <Card
              title="Transactions"
              content={restaurant.transactions.join(', ')}
              styles={{
                cardContainer: styles.cardContainer,
                cardTitle: styles.cardTitle,
                cardContent: styles.cardContent,
              }}
            />
          ) : null}
          <Card
            title="Category"
            content={restaurant.categories[0].title}
            styles={{
              cardContainer: styles.cardContainer,
              cardTitle: styles.cardTitle,
              cardContent: styles.cardContent,
            }}
          />
        </View>
      </ScrollView>
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
  phoneNumberStyle: {
    color: '#ffffff',
    marginLeft: 6,
  },
  infoContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: Dimensions.get('window').width / 2 - 30, // Adjust the width to fit 2 cards per row with margins
    marginRight: 15, // Add margin to the right of each card
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5F15',
  },
  cardContent: {
    color: 'black',
    marginTop: 5,
  },
});

export default RestaurantScreen;
