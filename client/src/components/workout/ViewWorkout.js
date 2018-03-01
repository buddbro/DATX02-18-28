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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // this.props.clearWorkout();
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow.png')}
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
          <View
            style={{ backgroundColor: '#7ad9c6', margin: 10, borderRadius: 3 }}
          >
            <Text
              style={{
                marginLeft: 15,
                marginTop: 8,
                marginBottom: 15,
                color: '#444',
                fontSize: 18,
                alignSelf: 'center'
              }}
            >
              {this.props.date.substring(0, 16)}
            </Text>
            <TextInput
              style={{
                height: 40,
                fontSize: 24,
                borderColor: '#eee',
                backgroundColor: '#fff',
                borderWidth: 1,
                borderRadius: 5,
                padding: 3,
                textAlign: 'center'
              }}
              onChangeText={title => this.setState({ title })}
              onEndEditing={() => {
                this.props.editWorkout(this.props.id, this.state.title);
                this.props.fetchWorkouts();
              }}
              returnKeyLabel="Save"
              clearButtonMode="while-editing"
              spellCheck={false}
              value={this.state.title}
            />
          </View>

          <View
            style={{ backgroundColor: '#7ad9c6', margin: 10, borderRadius: 3 }}
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
              Exercises
            </Text>
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
    backgroundColor: '#51c1ab',
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  addExerciseItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#8b8ddf'
  },
  exerciseListStyle: {}
});
