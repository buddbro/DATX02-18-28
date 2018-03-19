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
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'space-between'
  }
});
