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

        <FlatList
          style={styles.setListStyle}
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
        <TouchableOpacity style={styles.addSetButton}>
          <Text style={{
            fontSize: 20,
            color: '#fff',
          }}>Add set</Text>
        </TouchableOpacity>
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
          <Text style={styles.accordionHeaderTextStyle}>
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
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#8B8DDF',
    borderRadius: 8,
  },
  accordionHeader: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  accordionHeaderTextStyle: {
    color: '#fff',
    fontSize: 20,
  },
  accordionBody: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#B9BBF1',
    borderRadius: 8,
  },
  setListStyle: {

  },
  addSetButton: {
    backgroundColor: '#484BB4',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    paddingBottom: 10,
  }
});
