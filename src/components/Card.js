import React from 'react';
import { View, Text } from 'react-native';

const Card = ({
  title,
  content,
  styles: { cardContainerStyle, cardTitleStyle, cardContentStyle } = {},
}) => (
  <View style={cardContainerStyle}>
    <Text style={cardTitleStyle}>{title}</Text>
    <Text style={cardContentStyle}>{content}</Text>
  </View>
);

export default Card;
