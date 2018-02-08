import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { addSetToExercise } from '../../../actions';

class ExerciseSet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reps: '',
      weight: ''
    };
  }

  componentDidMount() {
    this.setState({
      reps: this.props.reps,
      weight: this.props.weight
    });
  }

  addSetToExercise() {
    this.props.addSetToExercise(
      this.props.userId,
      this.props.token,
      this.props.exerciseId,
      this.state.reps,
      this.state.weight
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Reps"
          onChangeText={reps => this.setState({ reps })}
          style={styles.reps}
          value={this.state.reps}
          keyboardType="numeric"
        />
        <Text style={styles.multiple}>x</Text>
        <TextInput
          placeholder="Weight"
          onChangeText={weight => this.setState({ weight })}
          style={styles.weight}
          value={this.state.weight}
          keyboardType="numeric"
        />
        <Text style={styles.multiple}>kg</Text>
        {this.props.id === -1
          ? <TouchableOpacity onPress={() => this.addSetToExercise()}>
              <Text>+</Text>
            </TouchableOpacity>
          : null}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    userId: user.id,
    token: user.token
  };
};

export default connect(mapStateToProps, { addSetToExercise })(ExerciseSet);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reps: {
    flex: 1,
    width: 50,
    height: 50
  },
  weight: {
    flex: 1,
    width: 50,
    height: 50
  },
  multiple: {
    flex: 1,
    fontWeight: 'bold'
  }
});
