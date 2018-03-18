import React from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SectionList,
  Animated,
  ListItem,
  FlatList,
  Image,
  TimePickerAndroid,
  DatePickerIOS,
  Platform
} from 'react-native';
import NavigationActions from 'react-navigation';
import Rating from 'react-native-rating';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  clearWorkout,
  editWorkout,
  fetchWorkouts,
  viewExercise,
  deleteWorkout,
  setDifficulty,
  saveNotes,
  setExerciseListType
} from '../../actions';
import WorkoutExercisesList from './WorkoutExercisesList';
import ExerciseCard from '../exercise/ExerciseCard';
import RatingWrapper from '../utilities/RatingWrapper';
import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

const { height, width } = Dimensions.get('window');
const images = {
  flexFilled: require('../../../assets/flex_full.png'),
  flexUnfilled: require('../../../assets/flex_empty.png')
};

class ViewWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initiated: false,
      title: '',
      notes: '',
      start: '--:--',
      stop: '--;--',
      timePicker: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.initiated) {
      this.setState({
        initiated: true,
        title: nextProps.workout.title,
        notes: nextProps.workout.notes,
        start: nextProps.workout.start || '--:--',
        stop: nextProps.workout.stop || '--:--'
      });
    }
  }

  deleteWorkout() {
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
            this.props.deleteWorkout(this.props.id);
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'Dashboard'
              })
            );
          }
        }
      ],
      { cancelable: true }
    );
  }

  saveWorkout() {
    const { title } = this.state;
    const start = new Date(
      `${this.props.workout.date.substring(0, 10)}T${this.state.start}:00`
    );
    const stop =
      this.state.stop !== '--:--'
        ? new Date(
            `${this.props.workout.date.substring(0, 10)}T${this.state.stop}:00`
          )
        : null;

    this.props.editWorkout(this.props.id, { title, start, stop });
  }

  setStartTime(time) {
    this.setState({ start: time.toString().substring(16, 21) });
  }

  setStopTime(time) {
    this.setState({ stop: time.toString().substring(16, 21) });
  }

  createDate(date) {
    const returnDate = new Date(`2000-01-01T${date}:00`);
    returnDate.setTime(
      returnDate.getTime() + returnDate.getTimezoneOffset() * 60 * 1000
    );
    return returnDate;
  }

  renderTimePicker() {
    const { timePicker } = this.state;

    if (timePicker !== '') {
      const callback =
        timePicker === 'start' ? this.setStartTime : this.setStopTime;

      const currentTime =
        timePicker === 'start' ? this.state.start : this.state.stop;

      if (Platform.OS === 'ios') {
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  timePicker: ''
                });
                this.saveWorkout();
              }}
              style={styles.saveDateButton}
            >
              <Text style={styles.saveDateButtonText}>Save</Text>
            </TouchableOpacity>
            <DatePickerIOS
              minimumDate={
                timePicker === 'stop' ? this.createDate(this.state.start) : null
              }
              maximumDate={
                timePicker === 'start' ? this.createDate(this.state.stop) : null
              }
              mode="time"
              date={this.createDate(currentTime)}
              onDateChange={callback.bind(this)}
            />
          </View>
        );
      } else {
        TimePickerAndroid.open({
          hour: Number(currentTime.substring(0, 2)),
          minute: Number(currentTime.substring(3, 5)),
          is24Hour: true
        }).then(({ action, hour, minute }) => {
          if (action !== TimePickerAndroid.dismissedAction) {
            hour = hour < 10 ? `0${hour}` : `${hour}`;
            minute = minute < 10 ? `0${minute}` : `${minute}`;
            this.setState({
              [timePicker]: `${hour}:${minute}`,
              timePicker: ''
            });
            this.saveWorkout();
          }
        });
      }
    }
  }

  render() {
    if (!(this.props.workout && this.props.workout.difficulty)) {
      return <View />;
    }

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        enableOnAndroid={true}
      >
        <Header>
          <BackArrow
            callback={() => {
              this.saveWorkout();
              this.setState({
                initiated: false,
                title: '',
                start: '',
                stop: ''
              });
              this.props.fetchWorkouts();
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.deleteWorkout();
            }}
          >
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </Header>
        <ScrollView>
          <View style={{ margin: 10, borderRadius: 3 }}>
            <TextInput
              style={styles.inputField}
              onChangeText={title => this.setState({ title })}
              onEndEditing={() => {
                this.saveWorkout();
              }}
              returnKeyLabel="Save"
              clearButtonMode="while-editing"
              spellCheck={false}
              value={this.state.title}
            />
            <View>
              <Text style={styles.workoutDate}>
                {this.props.workout.date.substring(0, 10)}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      timePicker: 'start'
                    })}
                >
                  <Text style={styles.workoutTimeTitle}>Start Time</Text>
                  <Text style={styles.workoutTime}>
                    {this.state.start}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      timePicker: 'stop'
                    })}
                >
                  <Text style={styles.workoutTimeTitle}>End Time</Text>
                  <Text style={styles.workoutTime}>
                    {this.state.stop}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>Exercises</Text>
            <FlatList
              style={styles.exerciseListStyle}
              data={this.props.exercises}
              keyExtractor={(item, index) => `exercise${item.id}`}
              renderItem={({ item }) => {
                return (
                  <ExerciseCard
                    id={item.id}
                    title={item.title}
                    exerciseTypeId={item.exercise_type_id}
                    navigation={this.props.navigation}
                  />
                );
              }}
            />
            <View style={styles.category}>
              <Text style={styles.categoriesText}>Categories</Text>
            </View>
          </View>
          <View style={styles.difficulty}>
            <Text style={styles.traitText}>Difficulty</Text>
            <View style={styles.ratingStyle}>
              <RatingWrapper
                rating={this.props.workout.difficulty}
                editable
                id={this.props.id}
                onChange={this.props.setDifficulty.bind(this)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={styles.difficultyText}>No Sweat</Text>
                <Text style={styles.difficultyText}>Hellish</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.traitText}>Notes</Text>
            <TextInput
              style={styles.notes}
              onChangeText={notes => this.setState({ notes })}
              onEndEditing={() =>
                this.props.saveNotes(this.props.id, this.state.notes)}
              value={this.state.notes}
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
        </ScrollView>

        <View style={{ bottom: 0 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.setExerciseListType('workout');
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
        </View>
        {this.renderTimePicker()}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = props => {
  const { id, workouts, exercises } = props.workout;
  const workout = workouts.filter(w => w.id === id)[0];

  return {
    id,
    workout,
    exercises
  };
};

export default connect(mapStateToProps, {
  clearWorkout,
  editWorkout,
  fetchWorkouts,
  viewExercise,
  deleteWorkout,
  setDifficulty,
  saveNotes,
  setExerciseListType
})(ViewWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  delete: {
    fontSize: 20,
    color: '#d33'
  },
  nameTextStyle: {
    margin: 25,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6669CB'
  },
  category: {},
  addExerciseTitle: {
    color: '#8b8ddf',
    fontSize: 24,
    fontWeight: 'bold'
  },
  categoriesText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    marginLeft: 10
  },
  addExerciseItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#8b8ddf',
    marginBottom: 15
  },
  saveDateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#8b8ddf',
    marginBottom: 15
  },
  saveDateButtonText: {
    color: '#8b8ddf',
    fontSize: 24,
    fontWeight: 'bold'
  },
  exerciseListStyle: {},
  inputField: {
    height: 70,
    fontSize: 32,
    borderColor: '#eee',
    backgroundColor: '#7ad9c6',
    borderWidth: 0,
    borderRadius: 5,
    color: '#fff',
    padding: 3,
    textAlign: 'center'
  },
  workoutDate: {
    marginLeft: 15,
    marginTop: 8,
    color: '#7B7B7B',
    fontSize: 32,
    fontWeight: '200',
    alignSelf: 'center'
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  workoutTimeTitle: {
    marginTop: 8,
    color: '#7B7B7B',
    fontSize: 18,
    fontWeight: '200',
    alignSelf: 'center'
  },
  workoutTime: {
    marginTop: 8,
    color: '#7B7B7B',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center'
  },
  exercisesContainer: {
    backgroundColor: '#7ad9c6',
    margin: 10,
    borderRadius: 3
  },
  exercisesTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15
  },
  traitText: {
    color: '#7ad9c6',
    fontSize: 20,
    padding: 15
  },
  difficulty: {
    flexDirection: 'row'
  },
  ratingStyle: {},
  difficultyText: {
    color: '#8b8ddf'
  },
  notes: {
    height: 80,
    padding: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#aaa',
    borderRadius: 3,
    borderWidth: 1
  }
});
