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
        style={styles.addWorkout}
      >
        <Text style={styles.plusSign}>
          {this.props.workout.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default connect(null, { chooseWorkout })(WorkoutLog);

const styles = StyleSheet.create({
  addWorkout: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: window.innerWidth,
    borderRadius: 5,
    paddingBottom: 5,
    backgroundColor: '#7AD9C6'
  },
  plusSign: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
