import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Keyboard,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  addSetToExercise,
  clearExercise,
  copySet,
  deleteExerciseFromWorkout,
  deleteSet,
  getExerciseDescription,
  getSetsForExercise,
  readInstruction,
  viewSet
} from '../../actions';
import NavigationActions from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeout from 'react-native-swipeout';

import ExerciseSet from './ExerciseSet';
import ExerciseHelp from './ExerciseHelp';
import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';
import globalStyles from '../../styles/global-styles';

class ViewExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionToggled: false,
      reps: '',
      weight: '',
      instructionsToggled: false,
      swipeOpen: -1
    };
  }

  viewInstructions() {
    if (this.state.instructionsToggled) {
      this.props.getExerciseDescription(this.props.visibleExerciseId);
      return (
        <View style={styles.popup}>
          <ExerciseHelp style={{ zIndex: 500 }} />
          <TouchableOpacity
            onPress={() => {
              this.props.readInstruction(this.props.visibleExerciseId);
              this.setState({ instructionsToggled: false });
            }}
            style={styles.popupBackground}
          />
        </View>
      );
    }
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
      this.props.visibleSet,
      this.state.reps,
      this.state.weight
    );

    this.setState({
      reps: '',
      weight: ''
    });
  }

  deleteExercise() {
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
            this.props.deleteExerciseFromWorkout(this.props.visibleSet);
            this.props.clearExercise();
            this.setState({ reps: '', sets: '' });
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'ViewWorkout'
              })
            );
          }
        }
      ],
      { cancelable: true }
    );
  }

  renderSets() {
    return this.props.sets.map((item, index) => {
      const key = `${this.props.id}${item.id}`;
      const cloneButton = [
        {
          text: 'Delete',
          backgroundColor: '#6A6EFD',
          onPress: () => {
            this.setState({ swipeOpen: -1 });
            this.props.copySet(item.id);
          },
          component: (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  textAlign: 'center'
                }}
              >
                Copy
              </Text>
            </View>
          )
        }
      ];

      const deleteButton = [
        {
          text: 'Delete',
          backgroundColor: '#fd6a6e',
          onPress: () => {
            this.props.deleteSet(item.id);
          },
          component: (
            <View style={{ flex: 1, justifyContent: 'center' }}>
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
        <Swipeout
          key={item.id}
          left={cloneButton}
          right={deleteButton}
          onOpen={(section, row, i) => {
            this.setState({ swipeOpen: item.id });
          }}
          close={this.state.swipeOpen !== item.id}
          backgroundColor={
            (index % 2 === 0 && this.props.sets.length % 2 === 1) ||
            (index % 2 === 1 && this.props.sets.length % 2 === 0)
              ? '#aeeee1'
              : '#98e0d2'
          }
          disabled={item.id === -1}
        >
          <ExerciseSet
            id={item.id}
            index={this.props.sets.length - index - 1}
            reps={item.id === -1 ? this.state.reps : String(item.reps)}
            weight={item.id === -1 ? this.state.weight : String(item.weight)}
            exerciseId={this.props.id}
            setReps={this.setReps.bind(this)}
            setWeight={this.setWeight.bind(this)}
          />
        </Swipeout>
      );
    });
  }

  render() {
    if (this.props.loading) {
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        {this.viewInstructions()}

        <Header backgroundColor="#b9baf1">
          <BackArrow
            color="white"
            callback={() => {
              this.addSetToExercise();
              this.props.clearExercise();
              this.setState({ reps: '', weight: '' });
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewWorkout'
                })
              );
            }}
          />
          <Text style={globalStyles.headerTitle}>
            {this.props.visibleExercise}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ instructionsToggled: true });
            }}
          >
            <Image
              source={require('../../../assets/info.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.setsContainer}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 10,
              paddingTop: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.addSetToExercise();
              }}
              style={[
                styles.addButton,
                {
                  backgroundColor:
                    this.state.reps !== '' && this.state.weight !== ''
                      ? '#51c1ab'
                      : '#d9d9d9'
                }
              ]}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: '#fff'
                }}
              >
                Add Set
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.singleSetContainer}>
            <View style={{ width: '20%' }}>
              <Text style={styles.setNumber}>#</Text>
            </View>

            <View style={styles.sets}>
              <Text style={styles.setNumber}>Reps</Text>
            </View>

            <View style={styles.reps}>
              <Text style={styles.setNumber}>Weight</Text>
            </View>
          </View>

          <View style={{ marginLeft: 8, marginRight: 8 }}>
            <ExerciseSet
              id={-1}
              index={this.props.sets.length}
              reps={this.state.reps}
              weight={this.state.weight}
              exerciseId={this.props.id}
              setReps={this.setReps.bind(this)}
              setWeight={this.setWeight.bind(this)}
            />
            {this.renderSets()}
          </View>

          {/* <FlatList
              style={{ marginLeft: 8, marginRight: 8 }}
              data={[...this.props.sets, { id: -1, reps: '', weight: '' }]}
              keyExtractor={(item, index) => `${item.id}${this.props.id}`}
              renderItem={({ item, index }) => {
                const key = `${this.props.id}${item.id}`;
                const cloneButton = [
                  {
                    text: 'Delete',
                    backgroundColor: '#6A6EFD',
                    onPress: () => {
                      this.setState({ swipeOpen: -1 });
                      this.props.copySet(item.id);
                    },
                    component: (
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 16,
                            textAlign: 'center'
                          }}
                        >
                          Copy
                        </Text>
                      </View>
                    )
                  }
                ];

                const deleteButton = [
                  {
                    text: 'Delete',
                    backgroundColor: '#fd6a6e',
                    onPress: () => {
                      this.props.deleteSet(item.id);
                    },
                    component: (
                      <View style={{ flex: 1, justifyContent: 'center' }}>
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
                  <Swipeout
                    left={cloneButton}
                    right={deleteButton}
                    onOpen={(section, row, i) => {
                      this.setState({ swipeOpen: index });
                    }}
                    close={this.state.swipeOpen !== index}
                    backgroundColor={index % 2 === 0 ? '#aeeee1' : '#98e0d2'}
                    disabled={item.id === -1}
                  >
                    <ExerciseSet
                      id={item.id}
                      index={index}
                      reps={
                        item.id === -1 ? this.state.reps : String(item.reps)
                      }
                      weight={
                        item.id === -1 ? this.state.weight : String(item.weight)
                      }
                      exerciseId={this.props.id}
                      setReps={this.setReps.bind(this)}
                      setWeight={this.setWeight.bind(this)}
                    />
                  </Swipeout>
                );
              }}
            /> */}
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
    workoutId: workout.id,
    visibleSet: workout.visibleSet,
    visibleExercise: workout.visibleExercise,
    visibleExerciseId: workout.visibleExerciseId,
    loading: workout.exerciseLoading
  };
};

export default connect(mapStateToProps, {
  addSetToExercise,
  clearExercise,
  copySet,
  deleteExerciseFromWorkout,
  deleteSet,
  getExerciseDescription,
  getSetsForExercise,
  readInstruction,
  viewSet
})(ViewExercise);

const styles = StyleSheet.create({
  scrollViewContainer: {
    //paddingBottom: 500
    // height: '100%'
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: '100%'
  },
  addButton: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#fff',
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  setsContainer: {
    backgroundColor: '#fff',
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 3
  },
  singleSetContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#51C1AB',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 8,
    marginRight: 8
  },
  setNumber: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  },
  sets: {
    width: '40%'
  },
  reps: {
    width: '40%'
  },
  popup: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99
  },
  popupBackground: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    width: '150%',
    height: '150%',
    zIndex: 100,
    alignSelf: 'stretch'
  }
});
