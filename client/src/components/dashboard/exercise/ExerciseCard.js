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
  viewExercise,
  addSetToExercise
} from '../../../actions';
import NavigationActions from 'react-navigation';

import ExerciseSet from './ExerciseSet';

class ExerciseCard extends React.Component {
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
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => {
          this.props.viewExercise(this.props.title);
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'ViewExercise'
            })
          );
          this.props.getSetsForExercise(this.props.id);
          this.props.viewSet(this.props.id);
        }}
      >
        <View>
          <Text style={styles.accordionHeaderTextStyle}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ user, workout }) => {
  return {
    userId: user.id,
    token: user.token,
    sets: workout.sets,
    visibleSet: workout.visibleSet
  };
};

export default connect(mapStateToProps, {
  getSetsForExercise,
  viewSet,
  viewExercise,
  addSetToExercise
})(ExerciseCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#aeeee1'
  },
  accordionHeader: {
    display: 'flex',
    flex: 1
  },
  accordionHeaderTextStyle: {
    fontSize: 18,
    color: '#333',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 3,
    textAlign: 'center',
    backgroundColor: '#aeeee1'
  },
  accordionBody: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#B9BBF1',
    borderRadius: 8
  },
  setListStyle: {},
  addSetButton: {
    backgroundColor: '#484BB4',
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
