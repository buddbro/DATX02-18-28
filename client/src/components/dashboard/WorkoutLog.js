import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NavigationActions from 'react-navigation';
import { chooseWorkout } from '../../actions';
import { connect } from 'react-redux';

class WorkoutLog extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDate() {
    const { date } = this.props.workout;
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][Number(date.substring(5, 7) - 1)];

    return (
      month +
      ' ' +
      Number(date.substring(8, 10)) +
      ' - ' +
      date.substring(11, 16)
    );
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.chooseWorkout(this.props.workout.id);
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'ViewWorkout'
            })
          );
        }}
        style={styles.workoutItem}
      >
        <View>
          <Text style={styles.title}>
            {this.props.workout.title}
          </Text>
        </View>
        <View>
          <Text style={styles.date}>
            {this.renderDate()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, { chooseWorkout })(WorkoutLog);

const styles = StyleSheet.create({
  workoutItem: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    backgroundColor: '#7AD9C6'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  date: {
    color: '#fff',
    fontSize: 18
  }
});
