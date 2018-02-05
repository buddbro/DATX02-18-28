import React from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import { clearWorkout } from '../../../actions';

// Denna ska hämta information om loggat träningspass
class ViewWorkout extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { title: '' };
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     title: nextProps.title
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
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
          <Text style={{ paddingLeft: 10 }}>Back</Text>
        </TouchableOpacity>

        <View style={styles.category}>
          <Text style={{ paddingLeft: 10 }}>
            Logged at {this.props.date}
          </Text>
        </View>

        {/* <View style={styles.workoutName}>
          <TextInput
            style={{
              height: 40,
              width: 200,
              fontSize: 24,
              borderColor: '#eee',
              borderWidth: 1,
              borderRadius: 5,
              padding: 3,
              textAlign: 'center'
            }}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </View> */}

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

const mapStateToProps = ({ workout }) => {
  const { id, title, date, exercises } = workout;
  return {
    id,
    title,
    date,
    exercises
  };
};

export default connect(mapStateToProps, { clearWorkout })(ViewWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    paddingTop: 35
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
