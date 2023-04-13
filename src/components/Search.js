import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';

const Search = ({text, setChave}) => {
  return (
    <View style={styles.div}>
      <Text style={styles.text}>
        <Icon name="search" size={30} color={COLORS.grey} />
      </Text>
      <TextInput
        style={styles.input}
        placeholder={text}
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setChave(t)}
      />
    </View>
  );
};
export default Search;

const styles = StyleSheet.create({
  div: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  input: {
    width: '90%',
    height: 50,
    fontSize: 16,
    paddingLeft: 2,
  },
  text: {
    paddingTop: 10,
    paddingLeft: 3,
    width: '10%',
    height: 50,
  },
});
