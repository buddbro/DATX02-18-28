import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import WorkoutLog from './WorkoutLog';
import axios from 'axios';
import { connect } from 'react-redux';
import { addWorkout, logout } from '../../actions';
import NavigationActions from 'react-navigation';

const { height, width } = Dimensions.get('window');
// Dashboard screen
class Workout extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ paddingTop: 20, backgroundColor: '#fff' }}>
          <TouchableOpacity
            onPress={() => {
              this.props.addWorkout(this.props.user.id, this.props.user.token);
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewWorkout'
                })
              );
            }}
            style={styles.addWorkout}
          >
            <Text style={styles.plusSign}>+</Text>
          </TouchableOpacity>
          {this.props.workouts.map((workout, index) =>
            <View key={workout.id} style={styles.item}>
              <WorkoutLog
                workout={workout}
                navigation={this.props.navigation}
              />
              <View style={styles.separator} />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ workout, user }) => {
  return {
    user,
    workouts: workout.workouts
  };
};

export default connect(mapStateToProps, { addWorkout, logout })(Workout);

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50
  },
  addWorkout: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    paddingBottom: 15,
    backgroundColor: '#b9baf1'
  },
  plusSign: {
    color: '#fff',
    fontSize: 100,
    fontWeight: 'bold'
  },
  item: { marginBottom: 20 },
  text: {},
  separator: {}
});
