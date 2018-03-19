import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

class Menu extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'WorkoutHistory'
              })
            )
          }
        >
          <Text style={styles.buttonText}>Previous workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'WorkoutSchedules'
              })
            );
          }}
        >
          <Text style={styles.buttonText}>Schedules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'WorkoutHistory'
              })
            )
          }
        >
          <Text style={styles.buttonText}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'Settings'
              })
            );
          }}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.logout(this.props.user.id);
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'LoginUser'
              })
            );
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {}
});
