import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }

  static navigationOptions = props => ({
    title: props.navigation.state.params.title
  });

  render() {
    return (
      <View style={styles.container}>
<<<<<<< HEAD:WorkoutApp/App.js
        <Text>Hello World :)</Text>
=======
        <Text>New Workout</Text>
>>>>>>> d6b0a5fff7541a097c74b1c7a81e836933d06dcb:client/components/Workout.js
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
