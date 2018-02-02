import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const WorkoutLog = props => {
  return (
    <TouchableOpacity style={styles.addWorkout}>
      <Text style={styles.plusSign}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
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
};
export default WorkoutLog;
