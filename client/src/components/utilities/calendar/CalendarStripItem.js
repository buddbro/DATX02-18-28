import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default class CalendarStripItem extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <View
        style={[
          styles.dateComponent,
          this.props.highlighted ? styles.highlightCircle : {}
        ]}
      >
        <Text
          style={[
            styles.dateText,
            this.props.highlighted ? styles.highlightText : {}
          ]}
        >
          {this.props.dateText}
        </Text>
        <Text
          style={[
            styles.dateNumber,
            this.props.highlighted ? styles.highlightNumber : {}
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
    borderWidth: 1
  },
  highlightText: {
    color: '#383DF4',
    fontSize: 14
  },
  highlightNumber: {
    color: '#383DF4',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dateComponent: {
    borderRadius: 150,
    width: Dimensions.get('window').width / 7,
    height: Dimensions.get('window').width / 7,
    borderWidth: 0,
    borderColor: '#383DF4',
    backgroundColor: '#B1EBE0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
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
