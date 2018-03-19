import React from 'react';
import { StyleSheet, View } from 'react-native';

export default (Header = ({ children, backgroundColor }) => (
  <View style={[styles.header, { backgroundColor }]}>{children}</View>
));

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
