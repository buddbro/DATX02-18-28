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
            {this.props.workout.date.substring(11, 16)}
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
