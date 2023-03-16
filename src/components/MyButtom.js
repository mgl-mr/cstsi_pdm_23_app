import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';

const MyButtom = ({text, onClick}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};
export default MyButtom;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#478b5d',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
