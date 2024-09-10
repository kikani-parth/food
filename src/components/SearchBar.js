// SearchBar.js

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchTerm, onSearchTermChange, onSearchTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Ionicons name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search"
        value={searchTerm}
        onChangeText={(newSearchTerm) => onSearchTermChange(newSearchTerm)}
        onEndEditing={() => onSearchTermSubmit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'rgb(230, 228, 228)',
    height: 40,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: '',
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

export default SearchBar;
