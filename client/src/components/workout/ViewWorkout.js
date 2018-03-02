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
  setDifficulty
} from '../../actions';
import WorkoutExercisesList from './WorkoutExercisesList';
import ExerciseCard from '../exercise/ExerciseCard';

const { height, width } = Dimensions.get('window');
const images = {
  flexFilled: require('../../../assets/flex_full.png'),
  flexUnfilled: require('../../../assets/flex_empty.png')
};

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
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.deleteWorkout();
            }}
          >
            <Text style={{ fontSize: 20, color: '#d33' }}>Delete</Text>
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
            <Text
              style={{
                marginLeft: 15,
                marginTop: 8,
                marginBottom: 15,
                color: '#7B7B7B',
                fontSize: 18,
                fontWeight: '200',
                alignSelf: 'center'
              }}
            >
              {this.props.date.substring(0, 16)}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#7ad9c6',
              margin: 10,
              borderRadius: 3
            }}
          >
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
          </View>
          <View style={styles.difficulty}>
            <Text style={styles.traitText}>Difficulty</Text>
            <View style={styles.ratingStyle}>
              <Rating
                selectedStar={images.flexFilled}
                unselectedStar={images.flexUnfilled}
                initial={this.props.difficulty}
                onChange={level =>
                  this.props.setDifficulty(this.props.id, level)}
                config={{
                  easing: Easing.inOut(Easing.ease),
                  duration: 350
                }}
                stagger={80}
                maxScale={1.4}
                starStyle={{
                  width: 40,
                  height: 40
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ color: '#8b8ddf' }}>No Sweat</Text>
                <Text style={{ color: '#8b8ddf' }}>Hellish</Text>
              </View>
            </View>
          </View>

          <View style={styles.notes}>
            <Text style={styles.traitText}>Notes</Text>
            <TextInput
              style={{
                height: 80,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                borderColor: 'gray',
                borderWidth: 1
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
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
  const { id, title, date, difficulty } = workout;
  return {
    id,
    title,
    date,
    difficulty,
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
  setDifficulty
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
  notes: {}
});
