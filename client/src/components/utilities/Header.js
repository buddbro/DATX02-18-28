import React from 'react';
import { StyleSheet, View } from 'react-native';

export default (Header = ({ children }) =>
  <View style={styles.header}>
    {children}
  </View>);

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  }
});
