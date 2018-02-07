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
import Exercise from './Exercise';
import ExerciseListItem from './ExerciseListItem';
import ExerciseListHeader from './ExerciseListHeader';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

class ExerciseList extends React.PureComponent {
  //keyExtractor = (item, index) => item.id;

  constructor(props) {
    super(props);

    // //bytas ut med data från backend
    // this.props.bigparts = {['Benchpress', 'Squat', 'Deadlift']}
    // this.props.smallparts = {['Bicep curl', 'Tricep extension', 'Crunches']}
  }

  renderSectionList() {
    const sections = Object.keys(
      (exerciseList = this.props.exercises.reduce((acc, next) => {
        const { id, name } = next;
        if (acc[next.exercise_type]) {
          acc[next.exercise_type] = [...acc[next.exercise_type], { id, name }];
        } else {
          acc[next.exercise_type] = [{ id, name }];
        }

        return acc;
      }, {}))
    ).reduce((acc, next) => {
      // const exerciseTypes = exerciseList[next].map(key => key.name);
      const exerciseTypes = exerciseList[next];
      return [...acc, { data: exerciseTypes, title: next }];
    }, []);

    console.log(sections);

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
          <Text>Back</Text>
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
