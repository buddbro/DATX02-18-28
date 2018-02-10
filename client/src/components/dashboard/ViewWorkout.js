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
  Animated,
  ListItem,
  FlatList
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import { clearWorkout, editWorkout, fetchWorkouts } from '../../actions';
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
          <View>
            <TextInput
              style={{
                height: 40,
                width,
                fontSize: 24,
                borderColor: '#eee',
                borderWidth: 1,
                borderRadius: 5,
                padding: 3,
                textAlign: 'center'
              }}
              onChangeText={title => this.setState({ title })}
              onEndEditing={() => {
                this.props.editWorkout(
                  this.props.user.id,
                  this.props.user.token,
                  this.props.id,
                  this.state.title
                );
                this.props.fetchWorkouts(
                  this.props.user.id,
                  this.props.user.token
                );
              }}
              returnKeyLabel="Save"
              clearButtonMode="while-editing"
              spellCheck={false}
              value={this.state.title}
            />
          </View>

          <FlatList
            style={styles.exerciseListStyle}
            data={this.props.exercises}
            keyExtractor={(item, index) => `exercise${item.id}`}
            renderItem={({ item }) => {
              return <ExerciseCard id={item.id} title={item.title} />;
            }}
          />
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
  editWorkout,
  fetchWorkouts
})(ViewWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 40
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
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
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    backgroundColor: '#7AD9C7'
  },
  exerciseListStyle: {}
});
