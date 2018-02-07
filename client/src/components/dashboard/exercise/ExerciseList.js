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
} from 'react-native';
import Exercise from './Exercise';
import { connect } from 'react-redux';

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
      const exerciseTypes = exerciseList[next].map(key => key.name);
      return [...acc, { data: exerciseTypes, title: next }];
    }, []);

    return (
      <SectionList
        renderItem={({ item }) =>
          <View>
            <Text>
              {item}
            </Text>
          </View>}
        renderSectionHeader={({ section }) =>
          <Text>
            {section.title}
          </Text>}
        sections={sections}
        keyExtractor={(item, index) => index}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSectionList()}
      </View>
    );
  }
}

const mapStateToProps = ({exercises}) => {
  return {
    exercises: exercises.list
  };
};

export default connect(mapStateToProps)(ExerciseList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  list: {
    flex: 1
  }
});
