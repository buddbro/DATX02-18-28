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

import ProfileHeader from './ProfileHeader';
import WorkoutHistory from '../workout/WorkoutHistory';
import LatestWorkout from './LatestWorkout';
import AddWorkout from './AddWorkout';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addWorkoutVisible: false };
  }

  hideModal() {
    this.setState({ addWorkoutVisible: false });
  }

  renderPopup() {
    if (this.state.addWorkoutVisible) {
      return (
        <View style={styles.popupContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                addWorkoutVisible: !this.state.addWorkoutVisible
              });
            }}
            style={styles.popupBackground}
          />
          <AddWorkout
            navigation={this.props.navigation}
            hideModal={this.hideModal.bind(this)}
          />
        </View>
      );
    }
  }
  renderToday() {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
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

  render() {
    return (
      <View style={styles.container}>
        <ProfileHeader
          user={this.props.user}
          navigation={this.props.navigation}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.todayContainer}>
            <Text style={styles.todayText}>
              {this.renderToday()}
            </Text>
          </View>
          <View style={styles.latestWorkout}>
            <LatestWorkout navigation={this.props.navigation} />

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'WorkoutHistory'
                  })
                )}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'WorkoutSchedules'
                  })
                );
              }}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'Achievements'
                  })
                );
              }}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Achievements</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                addWorkoutVisible: !this.state.addWorkoutVisible
              });
            }}
            style={styles.addWorkoutClean}
          >
            <Text style={styles.menuItemClean}>Lift weights!</Text>
          </TouchableOpacity>
        </View>
        {this.renderPopup()}
      </View>
    );
  }
}

const mapStateToProps = ({ workout, user }) => {
  return {
    workout,
    user
  };
};

export default connect(mapStateToProps)(Dashboard);

const styles = StyleSheet.create({
  scrollView: {
    // marginTop: 200,
    // bottom: 100
  },
  buttonContainer: {
    // position: 'absolute',
    // marginTop: 10,
    bottom: 0,
    marginBottom: 10,
    width: '100%',
    zIndex: 100
  },
  menuItemClean: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addWorkoutClean: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#7ad9c6',
    zIndex: 101
  },
  popupContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 199
  },
  popupBackground: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5,
    width: '150%',
    height: '150%',
    zIndex: 200,
    alignSelf: 'stretch'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  todayContainer: {
    marginBottom: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  todayText: {
    fontSize: 26,
    color: '#444',
    fontWeight: '200'
  },
  latestWorkout: {
    marginTop: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: '#b9baf1',
    backgroundColor: 'white',
    marginBottom: 10
  },
  menuItemText: {
    color: '#b9baf1',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
