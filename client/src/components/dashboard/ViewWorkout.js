import React from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import { clearWorkout, saveWorkout, fetchExerciseList } from '../../actions';

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

  componentDidMount() {
    this.props.fetchExerciseList();
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
            <Text style={{ fontSize: 24 }}>Back</Text>
          </TouchableOpacity>

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
            <Text style={{ fontSize: 24 }}>Finish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.workoutName}>
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
            onSubmitEditing={() =>
              this.props.saveWorkout(
                this.props.user.id,
                this.props.user.token,
                this.props.id,
                this.state.title
              )}
            returnKeyLabel="Save"
            value={this.state.title}
          />
        </View>

        <View style={styles.workoutName}>
          <Text style={styles.nameTextStyle}>
            {this.props.title}
          </Text>
        </View>

        <View style={styles.category}>
          <Text style={{ paddingLeft: 10 }}>Kategori</Text>
        </View>

        <View style={styles.category}>
          <Text style={{ paddingLeft: 10 }}>
            Exercises:{' '}
            {this.props.exercises.map(exercise => exercise.title + ' ')}
          </Text>
        </View>

        <View style={styles.category}>
          <Text style={{ paddingLeft: 10 }}>Time</Text>
        </View>

        <View style={styles.category}>
          <Text style={{ paddingLeft: 10 }}>Difficulty</Text>
        </View>

        <View style={styles.category}>
          <Text style={{ paddingLeft: 10 }}>Notes</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ workout, user }) => {
  const { id, title, date, exercises } = workout;
  return {
    id,
    title,
    date,
    exercises,
    user: {
      id: user.id,
      token: user.token
    }
  };
};

export default connect(mapStateToProps, {
  clearWorkout,
  saveWorkout,
  fetchExerciseList
})(ViewWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    paddingTop: 35
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
  },
  workoutName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameTextStyle: {
    margin: 25,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6669CB'
  },
  category: {}
});
