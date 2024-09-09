/* Custom Back Button */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({
  size = 24,
  color = 'white',
  styles = {},
  navigation = {},
}) => {
  return (
    <TouchableOpacity style={styles} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-circle" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BackButton;
