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
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/time.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor="#b9baf1">
          <View />
          <Text style={styles.headerTitle}>History</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <ScrollView>
          {this.props.workouts.map((workout, index) => (
            <View key={workout.id} style={styles.item}>
              <WorkoutLog
                workout={workout}
                navigation={this.props.navigation}
              />
              <View style={styles.separator} />
            </View>
          ))}
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
  headerTitle: {
    fontSize: 32,
    color: 'white'
  },
  headline: {
    fontSize: 32,
    color: 'gray'
  },
  headlineSmall: {
    fontSize: 24,
    color: '#b9baf1',
    fontWeight: '200',
    marginRight: 10
  },
  item: { marginBottom: 20 },
  text: {},
  separator: {}
});
