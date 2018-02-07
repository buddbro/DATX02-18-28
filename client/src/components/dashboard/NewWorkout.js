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
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

export default class NewWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: []
    };
  }

  render() {
    return (
      <View>
        <Text> hej </Text>
      </View>
    );
  }
}

//const mapStateToProps = state => ({});

//export default connect(mapStateToProps)(NewWorkout);
