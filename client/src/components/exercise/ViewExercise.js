import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  getSetsForExercise,
  viewSet,
  addSetToExercise,
  getExerciseDescription,
  clearExercise
} from '../../actions';
import NavigationActions from 'react-navigation';
import { BarChart } from 'react-native-svg-charts';

import ExerciseSet from './ExerciseSet';
import ExerciseHelp from './ExerciseHelp';

class ViewExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionToggled: false,
      reps: '',
      weight: '',
      instructionsToggled: false
    };
  }

  viewInstructions() {
    if (this.state.instructionsToggled) {
      this.props.getExerciseDescription(this.props.visibleExerciseId);
      return (
        <View style={styles.popup}>
          <ExerciseHelp style={{ zIndex: 500 }} />
          <TouchableOpacity
            onPress={() => {
              this.setState({ instructionsToggled: false });
            }}
            style={styles.popupBackground}
          />
        </View>
      );
    }
  }

  setReps(reps) {
    this.setState({ reps });
  }

  setWeight(weight) {
    this.setState({ weight });
  }

  addSetToExercise() {
    if (!this.state.reps || !this.state.weight) {
      return;
    }

    this.props.addSetToExercise(
      this.props.visibleSet,
      this.state.reps,
      this.state.weight
    );

    this.setState({
      reps: '',
      weight: ''
    });
  }

  render() {
    if (this.props.loading) {
      return <View style={styles.container} />;
    }

    const statisticsData = [
      {
        values: this.props.sets.reduce((acc, next) => {
          return [...acc, next.reps * next.weight];
        }, []),
        positive: {
          fill: '#6669cb'
        },
        negative: {
          fill: '#6669cb'
        }
      }
    ];

    return (
      <View style={styles.container}>
        {this.viewInstructions()}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.props.clearExercise();
              this.setState({ reps: '', sets: '' });
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewWorkout'
                })
              );
            }}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require('../../../assets/back_arrow_black.png')}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.exerciseTitle}>
              {this.props.visibleExercise}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.setsContainer}>
            <View style={styles.singleSetContainer}>
              <View style={{ width: '20%' }}>
                <Text style={styles.setNumber}>#</Text>
              </View>

              <View style={styles.sets}>
                <Text
                  style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}
                >
                  Reps
                </Text>
              </View>

              <View style={styles.reps}>
                <Text
                  style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}
                >
                  Weight
                </Text>
              </View>
            </View>

            <FlatList
              style={{ marginLeft: 8, marginRight: 8 }}
              data={[...this.props.sets, { id: -1, reps: '', weight: '' }]}
              keyExtractor={(item, index) => `${item.id}${this.props.id}`}
              renderItem={({ item, index }) => {
                const key = `${this.props.id}${item.id}`;
                return (
                  <ExerciseSet
                    id={item.id}
                    index={index}
                    reps={item.id === -1 ? this.state.reps : String(item.reps)}
                    weight={
                      item.id === -1 ? this.state.weight : String(item.weight)
                    }
                    exerciseId={this.props.id}
                    setReps={this.setReps.bind(this)}
                    setWeight={this.setWeight.bind(this)}
                  />
                );
              }}
            />
          </View>

          {/*        <View
            style={{ backgroundColor: '#b9baf1', margin: 10, borderRadius: 3 }}
          >
            <Text
              style={{
                marginLeft: 15,
                marginTop: 6,
                marginBottom: 15,
                color: '#444',
                fontSize: 18
              }}
            >
              Statistics
            </Text>
            <BarChart
              style={{ height: 200 }}
              data={statisticsData}
              contentInset={{ top: 30, bottom: 30, left: 10, right: 10 }}
            />
          </View> */}
        </ScrollView>
        <View style={{ bottom: 0 }}>
          <TouchableOpacity
            onPress={() => this.addSetToExercise()}
            style={styles.addSetButton}
          >
            <Text
              style={{
                fontSize: 24,
                color: '#6669cb'
              }}
            >
              Add set
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ bottom: 0 }}>
          <TouchableOpacity
            style={styles.addSetButton}
            onPress={() => {
              //this.props.getExerciseDescription(this.props.visibleExerciseId);
              //this.props.navigation.dispatch(
              //NavigationActions.NavigationActions.navigate({
              //  routeName: 'ExerciseHelp'
              //})
              //);
              this.setState({ instructionsToggled: true });
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: '#6669cb'
              }}
            >
              Instructions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user, workout, exercises }) => {
  return {
    exercises,
    id: user.id,
    token: user.token,
    sets: workout.sets,
    visibleSet: workout.visibleSet,
    visibleExercise: workout.visibleExercise,
    visibleExerciseId: workout.visibleExerciseId,
    loading: workout.exerciseLoading
  };
};

export default connect(mapStateToProps, {
  getSetsForExercise,
  viewSet,
  addSetToExercise,
  getExerciseDescription,
  clearExercise
})(ViewExercise);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 50,
    height: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10
  },
  addSetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '104%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#8b8ddf',
    marginBottom: 15
  },
  exerciseTitle: {
    color: '#6669cb',
    fontSize: 32,
    fontWeight: 'bold'
  },
  setsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 3
  },
  singleSetContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6669cb',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 8,
    marginRight: 8
  },
  setNumber: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  },
  sets: {
    width: '40%'
  },
  reps: {
    width: '40%'
  },
  instructions: {
    fontWeight: '200',
    fontSize: 18,
    color: '#7B7B7B'
  },
  titleContainer: {
    marginLeft: -35,
    justifyContent: 'center',
    flex: 7,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  popup: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99
  },
  popupBackground: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    width: '150%',
    height: '150%',
    zIndex: 100,
    alignSelf: 'stretch'
  }
});
