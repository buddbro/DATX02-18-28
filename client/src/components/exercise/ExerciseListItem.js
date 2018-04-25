import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default (ExerciseListItem = ({ name, callback }) =>
  <TouchableOpacity style={styles.container} onPress={callback}>
    <Text style={styles.text}>
      {name} 
    </Text>
  </TouchableOpacity>);

const styles = StyleSheet.create({
  container: {
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    padding: 30,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 24,
    color: '#7B7B7B'
  }
});
