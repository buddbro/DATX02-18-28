import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NavigationActions from 'react-navigation';

const WorkoutListItem = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.dispatch(
          NavigationActions.NavigationActions.navigate({
            routeName: 'Workout'
          })
        );
      }}
      style={styles.addWorkout}
    >
      <Text style={styles.title}>
        {props.workout.title}
      </Text>
      <Text style={styles.date}>
        {props.workout.date}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  addWorkout: {
    margin: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: window.innerWidth,
    borderRadius: 5,
    paddingBottom: 5,
    backgroundColor: '#7AD9C6'
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  date: {
    color: '#fff',
    fontSize: 14
  }
};

const mapStateToProps = state => ({});

export default WorkoutListItem;
