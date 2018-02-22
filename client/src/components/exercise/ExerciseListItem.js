import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationActions from 'react-navigation';
import { addExerciseToWorkout } from '../../actions';
import { connect } from 'react-redux';

class ExerciseListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.addExerciseToWorkout(
            this.props.userId,
            this.props.token,
            this.props.workoutId,
            this.props.exerciseId
          );
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'ViewWorkout'
            })
          );
        }}
      >
        <Text style={styles.nameText}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ user, workout }) => {
  return { workoutId: workout.id, userId: user.id, token: user.token };
};

export default connect(mapStateToProps, { addExerciseToWorkout })(
  ExerciseListItem
);

const styles = StyleSheet.create({
  container: {
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    padding: 30,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  nameText: {
    fontSize: 24
  }
});
