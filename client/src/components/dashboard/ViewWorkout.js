import React from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SectionList,
  ListItem
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import { clearWorkout, editWorkout } from '../../actions';
import WorkoutExercisesList from './WorkoutExercisesList';

import ExerciseCard from './exercise/ExerciseCard';

const { height, width } = Dimensions.get('window');

// Denna ska hämta information om loggat träningspass
class ViewWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title
    });
  }

  render() {
    console.log('Execises', this.props.exercises);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.clearWorkout();
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Workout'
                })
              );
            }}
          >
            <Text style={{ fontSize: 20 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.workoutName}>
            <TextInput
              style={{
                height: 40,
                width,
                fontSize: 24,
                borderColor: '#eee',
                borderWidth: 1,
                borderRadius: 5,
                padding: 3,
                textAlign: 'center',
                margin: 40
              }}
              onChangeText={title => this.setState({ title })}
              onEndEditing={() =>
                this.props.editWorkout(
                  this.props.user.id,
                  this.props.user.token,
                  this.props.id,
                  this.state.title
                )}
              returnKeyLabel="Save"
              clearButtonMode="while-editing"
              spellCheck={false}
              value={this.state.title}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ExerciseList'
                })
              );
            }}
            style={styles.addExerciseItem}
          >
            <View>
              <Text style={styles.addExerciseTitle}>Add exercise</Text>
            </View>
          </TouchableOpacity>

          {/* <View style={styles.workoutName}>
            <Text style={styles.nameTextStyle}>
              {this.props.title}
            </Text>
          </View> */}

          <View style={styles.category}>
            <Text style={{ paddingLeft: 10 }}>Kategori</Text>
          </View>

          <WorkoutExercisesList exercises={this.props.exercises} />

          <View style={styles.category}>
            <Text style={{ paddingLeft: 10 }}>Time</Text>
          </View>

          <View style={styles.category}>
            <Text style={{ paddingLeft: 10 }}>Difficulty</Text>
          </View>

          <View style={styles.category}>
            <Text style={{ paddingLeft: 10 }}>Notes</Text>
          </View>
          <ExerciseCard style={{flex: 2}}/>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ workout, user }) => {
  const { id, title, date } = workout;
  return {
    id,
    title,
    date,
    exercises: workout.exercises,
    user: {
      id: user.id,
      token: user.token
    }
  };
};

export default connect(mapStateToProps, {
  clearWorkout,
  editWorkout
})(ViewWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    paddingTop: 35
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
  },
  workoutName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameTextStyle: {
    margin: 25,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6669CB'
  },
  category: {},
  addExerciseTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  addExerciseItem: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    backgroundColor: '#7AD9C6'
  }
});
