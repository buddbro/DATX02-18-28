import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
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
        <View style={styles.textContainer}>
          <Text style={styles.title}>{this.props.workout.title} </Text>
          <Text style={styles.date}>{this.renderDate()} </Text>
        </View>
        <Image
          style={styles.arrow}
          source={require('../../../assets/right_arrow.png')}
        />
      </TouchableOpacity>
    );
  }
}

export default connect(null, { chooseWorkout })(WorkoutLog);

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column'
  },
  workoutItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 80,
    borderWidth: 1,
    borderColor: '#D9D9E0',
    width: '100%'
  },
  title: {
    marginLeft: 25,
    color: '#000',
    fontSize: 24,
    fontWeight: '200',
    textAlign: 'left',
    opacity: 0.8
  },
  date: {
    color: '#b9baf1',
    fontSize: 16,
    fontWeight: '200',
    marginLeft: 25
  },
  arrow: {
    opacity: 0.5,
    height: 15,
    width: 15,
    marginRight: 15
  }
});
