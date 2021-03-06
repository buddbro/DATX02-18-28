import React from 'react';
import {
  Alert,
  Animated,
  DatePickerIOS,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  ListItem,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import NavigationActions from 'react-navigation';
import Rating from 'react-native-rating';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeout from 'react-native-swipeout';
import {
  chooseWorkout,
  clearWorkout,
  deleteExerciseFromWorkout,
  deleteWorkout,
  editWorkout,
  fetchWorkouts,
  saveNotes,
  setColor,
  setDifficulty,
  setExerciseListType,
  viewExercise
} from '../../actions';
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
      timePicker: '',
      color: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.initiated) {
      // console.log('nextProps.workout.start', nextProps.workout.start);
      // console.log('nextProps.workout.stop', nextProps.workout.stop);
      // const start = moment(nextProps.workout.date);
      //
      // start.set('hour', nextProps.workout.start.substring(0, 2));
      // start.set('minutes', nextProps.workout.start.substring(3, 5));
      // start.subtract(1, 'hours');

      this.setState({
        initiated: true,
        title: nextProps.workout.title,
        notes: nextProps.workout.notes,
        // start: nextProps.workout.start ? start.format('HH:MM') : '--:--',
        start: nextProps.workout.start || '--:--',
        stop: nextProps.workout.stop || '--:--'
      });
    }

    this.setState({ color: nextProps.color });
  }

  focus(component) {
    this.refs[component].focus();
  }

  deleteWorkout() {
    Alert.alert(
      'Are you sure?',
      "This can't be undone",
      [
        {
          text: 'Cancel ',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Delete ',
          onPress: () => {
            this.props.deleteWorkout(this.props.id);
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: this.props.parent
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
    // const start = new Date(
    //   `${this.props.workout.date.substring(0, 10)}T${this.state.start}:00`
    // );
    // const start = moment(this.props.workout.date);

    // start.setTime(start.getTime() + 60 * 60 * 1000);

    const start = moment(this.props.workout.date);
    start.set('hour', this.state.start.substring(0, 2));
    start.set('minute', this.state.start.substring(3, 5));

    // const stop =
    //   this.state.stop !== '--:--'
    //     ? new Date(
    //         `${this.props.workout.date.substring(0, 10)}T${this.state.stop}:00`
    //       )
    //     : null;

    const stop =
      this.state.stop === '--:--' ? null : moment(this.props.workout.date);

    if (stop) {
      stop.set('hour', this.state.stop.substring(0, 2));
      stop.set('minute', this.state.stop.substring(3, 5));
    }

    // const stop = this.state.stop !== '--:--' ? moment(this.state.stop) : null;

    // if (stop) {
    //   stop.setTime(stop.getTime() + 60 * 60 * 1000);
    // }

    this.props.editWorkout(this.props.id, {
      title,
      start: start.format('YYYY-MM-DD HH:mm:00'),
      stop:
        this.state.stop === '--:--' ? null : stop.format('YYYY-MM-DD HH:mm:00')
    });
  }

  setStartTime(time) {
    this.setState({ start: time.toString().substring(16, 21) });
  }

  setStopTime(time) {
    console.log(time);
    this.setState({ stop: time.toString().substring(16, 21) });
  }

  createDate(date) {
    return new Date(`2000-01-01T${date}:00`);
  }

  setActiveColor(color) {
    return color === this.state.color ? 1 : 0.3;
  }

  renderAddExercise() {
    if (!this.state.timePicker) {
      return (
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
            <Text style={styles.addExerciseTitle}>Add exercise </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderTimePicker() {
    const { timePicker } = this.state;

    if (!timePicker) {
      return;
    }

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
            <Text style={styles.saveDateButtonText}>OK </Text>
          </TouchableOpacity>
          <DatePickerIOS
            // minimumDate={
            //   timePicker === 'stop' ? this.createDate(this.state.start) : null
            // }
            // maximumDate={
            //   timePicker === 'start' ? this.createDate(this.state.stop) : null
            // }
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

  renderColors() {
    const inactiveColors = [
      '#FAFDA7',
      '#FFA8A8',
      '#BAC3EE',
      '#8AD18A',
      '#A078B2'
    ];
    const colors = {
      yellow: '#FFFF57',
      red: '#FE5763',
      blue: '#6783F4',
      green: '#54F590',
      purple: '#BD5CF3'
    };

    return ['yellow', 'red', 'blue', 'green', 'purple'].map((color, index) => {
      return (
        <TouchableOpacity
          key={color}
          onPress={() => {
            this.setState({
              color
            });
            this.props.setColor(this.props.id, color);
          }}
          style={[
            styles.colorTag,
            {
              borderWidth: color !== this.state.color ? 0 : 2,
              backgroundColor:
                color !== this.state.color
                  ? inactiveColors[index]
                  : colors[color]
            }
          ]}
        />
      );
    });
  }

  render() {
    if (
      !(this.props.workout && this.props.workout.difficulty) ||
      this.props.loading
    ) {
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
            color="white"
            callback={() => {
              console.log(this.props.parent);
              this.saveWorkout();
              this.setState({
                initiated: false,
                title: '',
                start: '',
                stop: ''
              });
              this.props.fetchWorkouts();
              this.props.chooseWorkout(-1);
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: this.props.parent
                })
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.deleteWorkout();
            }}
          >
            <Text style={styles.delete}>Delete </Text>
          </TouchableOpacity>
        </Header>
        <ScrollView>
          <View
            style={{
              margin: 10,
              borderRadius: 3
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#7ad9c6',
                borderRadius: 5,
                paddingRight: 20
              }}
            >
              <TextInput
                ref="title"
                onFocus={() => this.focus('title')}
                style={styles.inputField}
                onChangeText={title => this.setState({ title })}
                onEndEditing={() => {
                  this.saveWorkout();
                }}
                underlineColorAndroid="transparent"
                returnKeyLabel="Save"
                autoCorrect={false}
                value={this.state.title }
              />
              <Image
                source={require('../../../assets/edit.png')}
                style={styles.icons}
              />
            </View>
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
                    })
                  }
                >
                  <Text style={styles.workoutTimeTitle}>Start Time </Text>
                  <Text style={styles.workoutTime}>{this.state.start} </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      timePicker: 'stop'
                    })
                  }
                >
                  <Text style={styles.workoutTimeTitle}>End Time </Text>
                  <Text style={styles.workoutTime}>{this.state.stop} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>Exercises </Text>
            <FlatList
              data={this.props.exercises}
              keyExtractor={(item, index) => `exercise${item.id}`}
              renderItem={({ item }) => {
                const button = [
                  {
                    text: 'Delete ',
                    backgroundColor: '#fd6a6e',
                    onPress: () => {
                      this.props.deleteExerciseFromWorkout(item.id);
                    },
                    component: (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          borderBottomWidth: 8,
                          borderColor: '#7ad9c6'
                        }}
                      >
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 16,
                            textAlign: 'center'
                          }}
                        >
                          Delete
                        </Text>
                      </View>
                    )
                  }
                ];

                return (
                  <Swipeout right={button} backgroundColor="#7ad9c6">
                    <ExerciseCard
                      id={item.id}
                      title={item.title}
                      exerciseTypeId={item.exercise_type_id}
                      navigation={this.props.navigation}
                    />
                  </Swipeout>
                );
              }}
            />
          </View>
          <View style={globalStyles.traitSubContainer}>
            <Text style={globalStyles.traitTitle}>Color tag </Text>
            <View style={styles.tagWrapper}>{this.renderColors()}</View>
          </View>
          <View style={globalStyles.traitSubContainer}>
            <Text style={globalStyles.traitTitle}>Difficulty </Text>
            <View>
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
                <Text style={styles.difficultyText}>No Sweat </Text>
                <Text style={styles.difficultyText}>Hellish </Text>
              </View>
            </View>
          </View>

          <View style={globalStyles.traitSubContainer}>
            <Text style={globalStyles.traitTitle}>Notes </Text>
            <KeyboardAwareScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              scrollEnabled={true}
              enableOnAndroid={true}
            >
              <TextInput
                ref="notes"
                placeholder="Short description of workout... "
                onFocus={() => this.focus('notes')}
                style={globalStyles.notes}
                onChangeText={notes => this.setState({ notes })}
                onEndEditing={() =>
                  this.props.saveNotes(this.props.id, this.state.notes)
                }
                value={this.state.notes }
                multiline={true}
                underlineColorAndroid="transparent"
              />
            </KeyboardAwareScrollView>
          </View>
        </ScrollView>

        {this.renderAddExercise()}
        {this.renderTimePicker()}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = props => {
  const { id, workouts, exercises } = props.workout;

  const workout = workouts.filter(w => w.id === id)[0];

  if (!workout) {
    return {};
  }

  return {
    id,
    workout,
    color: workout.color,
    exercises,
    parent: props.app.workoutParent
  };
};

export default connect(mapStateToProps, {
  chooseWorkout,
  clearWorkout,
  deleteExerciseFromWorkout,
  deleteWorkout,
  editWorkout,
  fetchWorkouts,
  saveNotes,
  setColor,
  setDifficulty,
  setExerciseListType,
  viewExercise
})(ViewWorkout);

const styles = StyleSheet.create({
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%'
  },
  colorTag: {
    marginLeft: 10,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'gray'
  },
  icons: {
    width: 25,
    height: 25,
    marginLeft: 25,
    marginRight: -30
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  delete: {
    fontSize: 20,
    color: '#fd3a3e'
  },
  addExerciseTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  addExerciseItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: '100%',
    backgroundColor: '#6669cb',
    marginBottom: 0
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
  inputField: {
    height: 70,
    fontSize: 32,
    borderColor: '#eee',
    backgroundColor: '#7ad9c6',
    borderWidth: 0,
    borderRadius: 5,
    color: '#fff',
    padding: 3,
    textAlign: 'center',
    width: '80%'
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
  difficultyText: {
    color: '#8b8ddf'
  }
});
