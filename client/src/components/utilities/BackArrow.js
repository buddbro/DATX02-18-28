import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

const backWhite = require('../../../assets/back_white.png');
const backBlack = require('../../../assets/back_black.png');

export default (BackArrow = ({ callback, color }) =>
  <TouchableOpacity onPress={callback}>
    <Image
      source={color === 'black' ? backBlack : backWhite}
      style={styles.back}
    />
  </TouchableOpacity>);

const styles = StyleSheet.create({
  back: {
    width: 30,
    height: 30
  }
});
