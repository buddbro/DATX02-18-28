import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationActions from 'react-navigation';
import { addExerciseToSchedule } from '../../actions';
import { connect } from 'react-redux';

class ExerciseListForScheduleItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.addExerciseToSchedule(
            this.props.exerciseId,
            this.props.name,
            this.props.active.id
          );
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'WorkoutSchedules'
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

const mapStateToProps = ({ schedules }) => {
  return { active: schedules.active };
};

export default connect(mapStateToProps, { addExerciseToSchedule })(
  ExerciseListForScheduleItem
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
