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

const { height, width } = Dimensions.get('window');
// Dashboard screen
class WorkoutHistory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 10,
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow_black.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingTop: 50, backgroundColor: '#fff' }}>
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

const mapStateToProps = ({ workout, user }) => {
  return {
    user,
    workouts: workout.workouts
  };
};

export default connect(mapStateToProps)(WorkoutHistory);

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  item: { marginBottom: 20 },
  text: {},
  separator: {}
});
