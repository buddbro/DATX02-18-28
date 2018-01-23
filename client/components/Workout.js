import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Workout extends React.Component {
  static navigationOptions = props => ({
    title: props.navigation.state.params.title
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>New Workout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
