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
  Image
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import {
  clearWorkout,
  editWorkout,
  fetchWorkouts,
  viewExercise,
  deleteWorkout
} from '../../actions';
import WorkoutExercisesList from './WorkoutExercisesList';
import ExerciseCard from '../exercise/ExerciseCard';

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
      <View style={styles.container}>
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
          <Text style={styles.traitText}>Difficulty</Text>
          <Text style={styles.traitText}>Notes</Text>
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
  editWorkout,
  fetchWorkouts,
  viewExercise,
  deleteWorkout
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
});
