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
import { addWorkout, logout } from '../../actions';
import NavigationActions from 'react-navigation';

class Workout extends React.Component {
  componentDidMount() {
    console.log('Elin testar', this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textStyle}>
            Welcome back {this.props.name}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.logout(this.props.userId);
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'LoginUser'
                })
              );
            }}
          >
            <Text style={{ fontSize: 20 }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.props.addWorkout(this.props.userId, this.props.token);
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

        <ScrollView>
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
    userId: user.id,
    token: user.token,
    name: user.name,
    workouts: workout.workouts
  };
};

export default connect(mapStateToProps, { addWorkout, logout })(Workout);

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcome: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
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
