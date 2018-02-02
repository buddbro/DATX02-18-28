import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';
import WorkoutListItem from './WorkoutListItem';
import axios from 'axios';

class WorkoutList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://37.139.0.80/api/workouts')
      .then(({ data }) => {
        this.setState({
          workouts: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textStyle}>Welcome back user!</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            try {
              AsyncStorage.setItem(
                '@LocalStore:token',
                'data.token'
              ).then(t => {
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'LoginUser'
                  })
                );
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Text style={{ marginLeft: 'auto', marginRight: 10 }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addWorkout}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>

        <ScrollView>
          {this.state.workouts.map((workout, index) =>
            <View key={workout.id} style={styles.item}>
              <WorkoutListItem title={workout.title} />
              <View style={styles.separator} />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(WorkoutList);

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcome: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
