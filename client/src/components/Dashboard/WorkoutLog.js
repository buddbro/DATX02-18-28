import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const WorkoutLog = () => {
  return (
    <TouchableOpacity
        style={styles.addWorkout}>
        <Text style={styles.plusSign}>logg</Text>
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
    fontSize: 100,
    fontWeight: 'bold'
  }
}
 export default WorkoutLog;
