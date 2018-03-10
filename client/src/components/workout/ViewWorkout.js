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
  Easing
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
  saveNotes
} from '../../actions';
import WorkoutExercisesList from './WorkoutExercisesList';
import ExerciseCard from '../exercise/ExerciseCard';
import RatingWrapper from '../utilities/RatingWrapper';

const { height, width } = Dimensions.get('window');
const images = {
  flexFilled: require('../../../assets/flex_full.png'),
  flexUnfilled: require('../../../assets/flex_empty.png')
};

class ViewWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', notes: 'hej' };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      notes: nextProps.notes
    });
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
    this.props.editWorkout(this.props.id, this.state.title);
  }

  render() {
    if (!this.props.difficulty) {
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // this.props.clearWorkout();
              this.saveWorkout();
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow_black.png')}
              style={styles.back}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.deleteWorkout();
            }}
          >
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ margin: 10, borderRadius: 3 }}>
            <TextInput
              style={styles.inputField}
              onChangeText={title => this.setState({ title })}
              onEndEditing={() => {
                this.saveWorkout();
                this.props.fetchWorkouts();
              }}
              returnKeyLabel="Save"
              clearButtonMode="while-editing"
              spellCheck={false}
              value={this.state.title}
            />
            <Text style={styles.workoutDate}>
              {this.props.date.substring(0, 16)}
            </Text>
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
                rating={this.props.difficulty}
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
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ workout, user }) => {
  const { id, title, date, difficulty, notes } = workout;
  return {
    id,
    title,
    date,
    difficulty,
    notes,
    exercises: workout.exercises,
    user: {
      id: user.id,
      token: user.token
    }
  };
};

export default connect(mapStateToProps, {
  clearWorkout,
  editWorkout,
  fetchWorkouts,
  viewExercise,
  deleteWorkout,
  setDifficulty,
  saveNotes
})(ViewWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 50
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  },
  back: {
    width: 35,
    height: 35
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
    marginBottom: 15,
    color: '#7B7B7B',
    fontSize: 18,
    fontWeight: '200',
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
