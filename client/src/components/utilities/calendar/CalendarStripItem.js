import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class CalendarStripItem extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.dateComponent,
          this.props.highlighted ? styles.highlightCircle : {}
        ]}
      >
        <Text
          style={[styles.dateText, this.props.faded ? styles.fadedText : {}]}
        >
          {this.props.dateText}
        </Text>
        <Text
          style={[
            styles.dateNumber,
            this.props.faded ? styles.fadedNumber : {}
          ]}
        >
          {this.props.dateNumber}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  highlightCircle: {
    backgroundColor: '#CAF4EC'
  },
  fadedText: {
    color: '#7F8785'
  },
  fadedNumber: {
    color: '#7F8785'
  },
  dateComponent: {
    borderRadius: 150,
    width: Dimensions.get('window').width / 7,
    height: Dimensions.get('window').width / 7,
    borderWidth: 0,
    borderColor: '#383DF4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 5
  },
  dateNumber: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  dateText: {
    fontWeight: '200',
    fontSize: 12
  }
});
