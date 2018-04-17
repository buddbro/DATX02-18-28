import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class LatestExercise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.accordionHeader}>
        <View style={styles.accordionBody}>
          <Text style={styles.accordionHeaderTextStyle}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordionHeader: {
    display: 'flex',
    flex: 1
  },
  accordionHeaderTextStyle: {
    fontSize: 18,
    color: '#333',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    backgroundColor: '#D2D3F6',
    color: 'white'
  },
  accordionBody: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#D2D3F6',
    paddingBottom: 5,
    marginBottom: 5
  }
});
