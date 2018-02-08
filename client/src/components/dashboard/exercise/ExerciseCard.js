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
import { getSetsForExercise, viewSet } from '../../../actions';

import ExerciseSet from './ExerciseSet';

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { accordionToggled: false };
  }

  toggleAccordion() {
    return (
      <View style={styles.accordionBody}>
        <TouchableOpacity>
          <Text>Add set</Text>
        </TouchableOpacity>
        <FlatList
          style={{ flex: 1 }}
          data={[...this.props.sets, { id: -1, reps: '', weight: '' }]}
          keyExtractor={(item, index) => `${item.id}${this.props.id}`}
          renderItem={({ item }) => {
            const key = `${this.props.id}${item.id}`;
            return (
              <ExerciseSet
                id={item.id}
                reps={String(item.reps)}
                weight={String(item.weight)}
                exerciseId={this.props.id}
              />
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => {
            this.props.getSetsForExercise(this.props.id);
            this.props.viewSet(this.props.id);
          }}
        >
          <Text>
            {this.props.title}
          </Text>
        </TouchableOpacity>

        {this.props.id === this.props.visibleSet
          ? this.toggleAccordion()
          : null}
      </View>
    );
  }
}

const mapStateToProps = ({ workout }) => {
  return {
    sets: workout.sets,
    visibleSet: workout.visibleSet
  };
};

export default connect(mapStateToProps, { getSetsForExercise, viewSet })(
  ExerciseCard
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  accordionHeader: {
    flex: 1
  },
  accordionBody: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    alignSelf: 'stretch'
  }
});
