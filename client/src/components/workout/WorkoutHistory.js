import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import WorkoutLog from './WorkoutLog';
import axios from 'axios';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

const { height, width } = Dimensions.get('window');

class WorkoutHistory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header>
          <BackArrow
            callback={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          />
        </Header>
        <ScrollView style={{ paddingTop: 50, backgroundColor: '#fff' }}>
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

const mapStateToProps = ({ workout }) => {
  return {
    workouts: workout.workouts
  };
};

export default connect(mapStateToProps)(WorkoutHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: { marginBottom: 20 },
  text: {},
  separator: {}
});
