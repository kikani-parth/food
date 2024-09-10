// RestaurantDetail.js

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons/';

const RestaurantDetail = ({ restaurant }) => {
  return (
    <View style={styles.containerStyle}>
      <Image source={{ uri: restaurant.image_url }} style={styles.imageStyle} />
      <Text style={styles.nameStyle}>{restaurant.name}</Text>
      <View style={styles.ratingReviewContainer}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" style={styles.starIcon} />
          <Text style={styles.ratingStyle}>{restaurant.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <MaterialIcons name="reviews" style={styles.reviewIcon} />
          <Text style={styles.reviewStyle}>{restaurant.review_count}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 15,
    backgroundColor: '#FAF9F6',
    borderRadius: 15,
    width: 230,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    marginBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  nameStyle: {
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
  },
  ratingReviewContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FF5F15',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  starIcon: {
    size: 13,
    color: '#FF5F15',
    marginTop: 4,
    marginLeft: 5,
  },
  ratingStyle: {
    margin: 3,
    marginLeft: 5,
    color: '#FF5F15',
    fontSize: 12,
    paddingRight: 5,
  },
  reviewContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FF5F15',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  reviewIcon: {
    size: 13,
    color: '#FF4433',
    marginTop: 4,
    marginLeft: 5,
  },
  reviewStyle: {
    margin: 3,
    marginLeft: 5,
    color: '#FF5F15',
    fontSize: 12,
    paddingRight: 5,
  },
});

export default RestaurantDetail;
