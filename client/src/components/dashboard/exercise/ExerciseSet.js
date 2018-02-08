import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

export default class ExerciseSet extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="Reps"
          style={styles.reps}
        />
        <Text style={styles.multiple}> x </Text>
        <TextInput
          placeholder="Weight"
          style={styles.weight}
        />
      <Text style={styles.multiple}>kg</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reps: {
    flex: 1,
    width: 50,
    height: 50,
  },
  weight: {
    flex: 1,
    width: 50,
    height: 50,
  },
  multiple: {
    flex: 1,
    fontWeight: 'bold',
  }
});
