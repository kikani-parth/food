import React from 'react';
import { View, Text } from 'react-native';

const Card = ({
  title,
  content,
  styles: { cardContainer, cardTitle, cardContent } = {},
}) => (
  <View style={cardContainer}>
    <Text style={cardTitle}>{title}</Text>
    <Text style={cardContent}>{content}</Text>
  </View>
);

export default Card;
