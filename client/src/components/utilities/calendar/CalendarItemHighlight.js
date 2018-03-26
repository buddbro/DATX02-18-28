import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';

export default class CalendarItemHighlight extends React.Component {
  render() {
    console.log(this.props.offset);
    return (
      <View
        style={[
          styles.highlighted,
          { opacity: Math.abs(Math.cos(this.props.offset / 10)) }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  highlighted: {
    backgroundColor: '#CAF4EC',
    position: 'absolute',
    marginLeft: Dimensions.get('window').width * 3 / 7,
    marginRight: Dimensions.get('window').width * 3 / 7,

    alignSelf: 'center',
    width: Dimensions.get('window').width / 7,
    height: Dimensions.get('window').width / 7,
    padding: 5,
    borderRadius: 50,
    opacity: this.opacityValue
  }
});
