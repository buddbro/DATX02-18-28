import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import ExerciseCard from '../exercise/ExerciseCard';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';
import { chooseWorkout } from '../../actions';
import LatestExercise from './LatestExercise';

class LatestWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggled: false, loading: true };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.latestWorkout &&
      nextProps.latestWorkout.id >= 0 &&
      this.state.loading
    ) {
      this.props.chooseWorkout(nextProps.latestWorkout.id);
      this.setState({ loading: false });
    }
  }

  toggleAccordion() {
    if (!this.props.latestWorkout) {
      return null;
    }

    if (this.state.toggled) {
      return (
        <View style={styles.accordionBody}>
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutTitle}>
              {this.props.latestWorkout.title}
            </Text>
            <Text style={styles.tinder}>
              {this.props.latestWorkout.date.substring(0, 10)}
            </Text>
          </View>
          <FlatList
            style={styles.exercises}
            data={this.props.exercises}
            keyExtractor={(item, index) => `exercise${item.id}`}
            renderItem={({ item }) => {
              return (
                <LatestExercise
                  id={item.id}
                  title={item.title}
                  exerciseTypeId={item.exercise_type_id}
                />
              );
            }}
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              this.props.chooseWorkout(this.props.latestWorkout.id);
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewWorkout'
                })
              );
            }}
          >
            <Text style={styles.continueText}>Continue workout</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => {
            this.setState({ toggled: !this.state.toggled });
          }}
        >
          <Text style={styles.accordionTitle}>Latest workout</Text>
        </TouchableOpacity>
        {this.toggleAccordion()}
      </View>
    );
  }
}
const mapStateToProps = ({ workout }) => {
  //const latestWorkout = workout.workouts[workout.workouts.length - 1];
  const latestWorkout = workout.workouts[0];
  const { exercises } = workout;
  return {
    latestWorkout,
    exercises
  };
};

export default connect(mapStateToProps, { chooseWorkout })(LatestWorkout);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    width: '100%',
    height: 80,
    borderRadius: 5,
    backgroundColor: '#b9baf1'
  },
  accordionBody: {
    marginTop: -6,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#B9BAF1',
    borderRadius: 5
  },
  accordionTitle: {
    paddingTop: 12,
    fontWeight: 'bold',
    fontSize: 42,
    color: 'white',
    textAlign: 'center'
  },
  workoutHeader: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#A6A8E5',
    marginRight: 5,
    marginLeft: 5
  },
  workoutTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: 'white'
  },
  tinder: {
    fontWeight: '200',
    textAlign: 'center',
    color: 'white',
    fontSize: 22
  },
  exercises: {
    padding: 5
  },
  continueButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#A6A8E5'
  },
  continueText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
