import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

import { addWorkout } from '../../actions';
import ProfileHeader from './ProfileHeader';
import Workout from '../workout/Workout';
import LatestWorkout from './LatestWorkout';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addWorkoutVisible: false };
  }

  renderToday() {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    const months = [
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
    ];

    const date = new Date();
    return `${weekdays[date.getUTCDay()]}, ${date.getDate()} ${months[
      date.getMonth()
    ]}`;
  }

  renderAddMenu() {
    if (this.state.addWorkoutVisible) {
      return <View />;
    } else {
      return <Text style={styles.menuItem}>+</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileHeader
          user={this.props.user}
          navigation={this.props.navigation}
        />

        <View
          style={{
            marginTop: 80,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}
        >
          <ScrollView>
            <View
              style={{
                marginBottom: 5,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 26, color: '#444', fontWeight: '200' }}>
                {this.renderToday()}
              </Text>
            </View>
            <LatestWorkout navigation={this.props.navigation} />

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  addWorkoutVisible: !this.state.addWorkoutVisible
                });
                // this.props.addWorkout(
                //   this.props.user.id,
                //   this.props.user.token
                // );
                // this.props.navigation.dispatch(
                //   NavigationActions.NavigationActions.navigate({
                //     routeName: 'ViewWorkout'
                //   })
                // );
              }}
              style={styles.addWorkout}
            >
              {this.renderAddMenu()}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'Workout'
                  })
                )}
              style={styles.addWorkout}
            >
              <Text style={[styles.menuItem, { fontSize: 48, paddingTop: 12 }]}>
                History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'WorkoutSchedules'
                  })
                );
              }}
              style={styles.addWorkout}
            >
              <Text style={[styles.menuItem, { fontSize: 48, paddingTop: 12 }]}>
                Schedules
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ workout, user, schedule }) => {
  return {
    workout,
    user,
    schedule
  };
};

export default connect(mapStateToProps, { addWorkout })(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
    flexDirection: 'column'
  },
  addWorkout: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    paddingBottom: 15,
    backgroundColor: '#b9baf1'
  },
  menuItem: {
    color: '#fff',
    fontSize: 100,
    fontWeight: 'bold'
  }
});
