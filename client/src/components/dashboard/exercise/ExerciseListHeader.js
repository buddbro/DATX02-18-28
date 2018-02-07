import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class ExerciseListHeader extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7AD9C6',
    height: 70,
    justifyContent: 'center',
  },
  headerText: {
    paddingLeft: 20,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
