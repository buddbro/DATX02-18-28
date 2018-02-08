import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import { addSetToExercise } from '../../../actions';

class ExerciseSet extends React.Component {
  addSetToExercise() {
    this.props.addSetToExercise(1, 2, 3, 4, 5);
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="Reps"
          style={styles.reps}
          value={this.props.reps}
        />
        <Text
          style={styles.multiple}
          >
          x
        </Text>
        <TextInput
          placeholder="Weight"
          style={styles.weight}
          value={this.props.weight}
        />
      <Text
        style={styles.multiple}
        >
        kg
      </Text>
      <TouchableOpacity
        onPress={this.addSetToExercise()}
      >
        <Text>+</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, {addSetToExercise})(ExerciseSet);

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
