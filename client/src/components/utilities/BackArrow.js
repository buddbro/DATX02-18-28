import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export default (BackArrow = ({ callback }) =>
  <TouchableOpacity onPress={callback}>
    <Image
      source={require('../../../assets/back_arrow_black.png')}
      style={styles.back}
    />
  </TouchableOpacity>);

const styles = StyleSheet.create({
  back: {
    width: 35,
    height: 35
  }
});
