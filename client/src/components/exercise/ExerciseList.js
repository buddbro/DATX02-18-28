import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  ListItem,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { addExerciseToWorkout, addExerciseToSchedule } from '../../actions';
import NavigationActions from 'react-navigation';

import ExerciseListItem from './ExerciseListItem';
import ExerciseListHeader from './ExerciseListHeader';
import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

class ExerciseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseAdded: false,
      workoutExercises: []
    };
  }

  componentDidMount() {
    const { workoutExercises } = this.props;
    this.setState({ workoutExercises });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.workoutExercises.length > 0 &&
      nextProps.workoutExercises.length > this.props.workoutExercises.length &&
      !this.state.exerciseAdded
    ) {
      console.log('Exercise added');

      this.setState({ exerciseAdded: true });
    }
  }

  renderSectionList() {
    // Reduce exercises returned from database to build the datastructure
    // required for the SectionList component.
    const sections = Object.keys(
      (exerciseList = this.props.exercises.reduce((acc, next) => {
        acc[next.exercise_type] = acc[next.exercise_type]
          ? [...acc[next.exercise_type], { id: next.id, name: next.name }]
          : [{ id: next.id, name: next.name }];
        return acc;
      }, {}))
    ).reduce((acc, next) => {
      return [...acc, { data: exerciseList[next], title: next }];
    }, []);

    // if (this.state.exerciseAdded) {
    //   console.log(
    //     this.props.workoutExercises[this.props.workoutExercises.length - 1]
    //   );
    // }

    let callback = () => {};
    switch (this.props.type) {
      case 'workout':
        callback = item => {
          this.props.addExerciseToWorkout(this.props.workoutId, item.id);
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'ViewWorkout'
            })
          );
        };
        break;
      case 'schedule':
        callback = item => {
          this.props.addExerciseToSchedule(
            item.id,
            item.name,
            this.props.active.id
          );
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'Schedules'
            })
          );
        };
    }

    return (
      <SectionList
        renderItem={({ item }) => (
          <ExerciseListItem
            name={item.name}
            callback={callback.bind(this, item)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <ExerciseListHeader title={section.title} />
        )}
        sections={sections}
        keyExtractor={(item, index) => index}
        style={styles.list}
      />
    );
  }

  render() {
    const previousRoute =
      this.props.type === 'workout' ? 'ViewWorkout' : 'Schedules';

    return (
      <View style={styles.container}>
        <Header>
          <BackArrow
            color="white"
            callback={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: previousRoute
                })
              );
            }}
          />
        </Header>
        {this.renderSectionList()}
      </View>
    );
  }
}

const mapStateToProps = ({ exercises, workout, schedules, app }) => {
  return {
    exercises: exercises.list,
    workoutId: workout.id,
    workoutExercises: workout.exercises,
    active: schedules.active,
    type: app.exerciseListType
  };
};

export default connect(mapStateToProps, {
  addExerciseToWorkout,
  addExerciseToSchedule
})(ExerciseList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  list: {
    marginTop: 10,
    flex: 1
  }
});
