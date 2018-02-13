import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import {
  getSetsForExercise,
  viewSet,
  addSetToExercise
} from '../../../actions';
import NavigationActions from 'react-navigation';

import ExerciseSet from './ExerciseSet';

class ViewExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = { accordionToggled: false, reps: '', weight: '' };
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
      this.props.userId,
      this.props.token,
      this.props.id,
      this.state.reps,
      this.state.weight
    );

    this.setState({
      reps: '',
      weight: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewWorkout'
                })
              );
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff' }}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{ backgroundColor: '#b9baf1', margin: 10, borderRadius: 3 }}
          >
            <Text
              style={{
                marginTop: 15,
                marginBottom: 15,
                color: '#444',
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              {this.props.visibleExercise}
            </Text>
          </View>

          <View
            style={{ backgroundColor: '#b9baf1', margin: 10, borderRadius: 3 }}
          >
            <Text
              style={{
                marginLeft: 8,
                marginTop: 6,
                marginBottom: 15,
                color: '#444',
                fontSize: 18
              }}
            >
              Sets
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#6669cb',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginLeft: 8,
                marginRight: 8
              }}
            >
              <View style={{ width: '20%' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}
                >
                  #
                </Text>
              </View>

              <View style={{ width: '40%' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}
                >
                  Reps
                </Text>
              </View>

              <View style={{ width: '40%' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}
                >
                  Weight
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
                    reps={item.id === -1 ? this.state.reps : String(item.reps)}
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
            <TouchableOpacity
              onPress={() => this.addSetToExercise()}
              style={styles.addSetButton}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff'
                }}
              >
                Add set
              </Text>
            </TouchableOpacity>
          </View>
          <View
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
          </View>
        </ScrollView>
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
    visibleSet: workout.visibleSet,
    visibleExercise: workout.visibleExercise
  };
};

export default connect(mapStateToProps, {
  getSetsForExercise,
  viewSet,
  addSetToExercise
})(ViewExercise);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8b8ddf',
    paddingTop: 40
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  addSetButton: {
    backgroundColor: '#6669cb',
    margin: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10
  }
});
