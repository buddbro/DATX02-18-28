import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  Header,
  ListItem
} from 'react-native';
import ExerciseListItem from './ExerciseListItem';
import ExerciseListHeader from './ExerciseListHeader';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

class ExerciseList extends React.PureComponent {
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
          <ExerciseListItem
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
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'ViewWorkout'
              })
            );
          }}
        >
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps)(ExerciseList);

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
