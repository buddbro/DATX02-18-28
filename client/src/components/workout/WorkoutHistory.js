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
            justifyContent: 'space-between',
            borderBottomWidth: 0,
            borderColor: 'gray',
            paddingBottom: 30,
            alignItems: 'center'
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
              style={{ width: 35, height: 35, marginLeft: 10 }}
            />
          </TouchableOpacity>
          <Text style={styles.headline}>History</Text>
          <Text style={styles.headlineSmall}>Filter</Text>
        </View>
        <ScrollView style={{ paddingTop: 10, backgroundColor: '#fff' }}>
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
  headline: {
    fontSize: 32,
    color: '#b9baf1'
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
