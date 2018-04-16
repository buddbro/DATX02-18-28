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
import {
  addExerciseToSchedule,
  addExerciseToWorkout,
  getSetsForExercise,
  viewExercise,
  viewSet
} from '../../actions';
import NavigationActions from 'react-navigation';

import ExerciseListItem from './ExerciseListItem';
import ExerciseListHeader from './ExerciseListHeader';
import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

class ExerciseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseTypeId: 0,
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
      nextProps.workoutExercises.length > this.props.workoutExercises.length
    ) {
      if (this.props.type === 'workout') {
        const newExercise =
          nextProps.workoutExercises[nextProps.workoutExercises.length - 1];

        this.props.viewExercise(
          newExercise.title,
          newExercise.id,
          newExercise.exercise_type_id
        );
        this.props.navigation.dispatch(
          NavigationActions.NavigationActions.navigate({
            routeName: 'ViewExercise'
          })
        );
        this.props.getSetsForExercise(newExercise.id);
        this.props.viewSet(newExercise.id);
      }
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

    let callback = () => {};
    switch (this.props.type) {
      case 'workout':
        callback = item => {
          this.props.addExerciseToWorkout(this.props.workoutId, item.id);
          this.setState({ exerciseTypeId: item.id });
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
  addExerciseToSchedule,
  addExerciseToWorkout,
  getSetsForExercise,
  viewExercise,
  viewSet
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
