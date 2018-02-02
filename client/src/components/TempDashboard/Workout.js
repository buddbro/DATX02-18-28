import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import WorkoutLog from './WorkoutLog';
import axios from 'axios';

export default class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://37.139.0.80/api/workouts')
      .then(({ data }) => {
        this.setState({
          workouts: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textStyle}>Welcome back user!</Text>
        </View>

        <TouchableOpacity style={styles.addWorkout}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>

        <ScrollView>
          {this.state.workouts.map((workout, index) =>
            <View key={workout.id} style={styles.item}>
              <WorkoutLog title={workout.title} />
              <View style={styles.separator} />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcome: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 150,
    paddingTop: 20,
    paddingLeft: 5
  },
  textStyle: {
    fontSize: 20
  },
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
  },
  item: {},
  text: {},
  separator: {}
});
