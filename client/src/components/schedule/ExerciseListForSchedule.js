import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  Header,
  ListItem,
  Image
} from 'react-native';
import ExerciseListForScheduleItem from './ExerciseListForScheduleItem';
import ExerciseListHeader from '../exercise/ExerciseListHeader';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

class ExerciseListForSchedule extends React.PureComponent {
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

    return (
      <SectionList
        renderItem={({ item }) =>
          <ExerciseListForScheduleItem
            name={item.name}
            exerciseId={item.id}
            navigation={this.props.navigation}
          />}
        renderSectionHeader={({ section }) =>
          <ExerciseListHeader title={section.title} />}
        sections={sections}
        keyExtractor={(item, index) => index}
        style={styles.list}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'WorkoutSchedules'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow_black.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>
        </View>
        {this.renderSectionList()}
      </View>
    );
  }
}

const mapStateToProps = ({ exercises }) => {
  return {
    exercises: exercises.list
  };
};

export default connect(mapStateToProps)(ExerciseListForSchedule);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50
  },
  list: {
    marginTop: 10,
    flex: 1
  }
});
