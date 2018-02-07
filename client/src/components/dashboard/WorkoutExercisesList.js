import React from 'react';
import { View, Text } from 'react-native';

class WorkoutExercisesList extends React.Component {
  render() {
    return (
      <View>
        <Text>Workout Exercises List</Text>
        {this.props.exercises.map(exercise => {
          return (
            <Text>
              {exercise}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default WorkoutExercisesList;
