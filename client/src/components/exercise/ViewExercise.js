import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Keyboard,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  getSetsForExercise,
  viewSet,
  addSetToExercise,
  deleteExerciseFromWorkout,
  getExerciseDescription,
  clearExercise,
  readInstruction
} from '../../actions';
import NavigationActions from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import { BarChart } from 'react-native-svg-charts';

import ExerciseSet from './ExerciseSet';
import ExerciseHelp from './ExerciseHelp';
import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';
import globalStyles from '../../styles/global-styles';

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
              this.props.readInstruction(this.props.visibleExerciseId);
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

  deleteExercise() {
    Alert.alert(
      'Are you sure?',
      "This can't be undone",
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteExerciseFromWorkout(this.props.visibleSet);
            this.props.clearExercise();
            this.setState({ reps: '', sets: '' });
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'ViewWorkout'
              })
            );
          }
        }
      ],
      { cancelable: true }
    );
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
        <Header backgroundColor="#b9baf1">
          <BackArrow
            color="white"
            callback={() => {
              this.addSetToExercise();
              this.props.clearExercise();
              this.setState({ reps: '', weight: '' });
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewWorkout'
                })
              );
            }}
          />
          <Text style={globalStyles.headerTitle}>
            {this.props.visibleExercise}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ instructionsToggled: true });
            }}
          >
            <Image
              source={require('../../../assets/info.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#fff' }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          extraHeight={150}
          enableOnAndroid={true}
        >
          <View>
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
                    Weight (kg)
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
                      reps={
                        item.id === -1 ? this.state.reps : String(item.reps)
                      }
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
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 40,
            paddingTop: 55
          }}
        >
          <TouchableOpacity
            onPress={() => this.addSetToExercise()}
            style={styles.addButton}
          >
            <Text
              style={{
                fontSize: 24,
                color: '#fff'
              }}
            >
              Add Set
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.deleteExercise.bind(this)}
            style={styles.deleteButton}
          >
            <Text
              style={{
                fontSize: 24,
                color: '#fff'
              }}
            >
              Delete Exercise
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
    workoutId: workout.id,
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
  clearExercise,
  deleteExerciseFromWorkout,
  readInstruction
})(ViewExercise);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: '100%'
  },
  addButton: {
    width: '70%',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#51C1AB',
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#51C1AB'
  },
  deleteButton: {
    width: '70%',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#FD6A6E',
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#FD6A6E'
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
    backgroundColor: '#51C1AB',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingRight: 25,
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
