import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Reps"
          onChangeText={reps => this.props.setReps(String(reps))}
          style={styles.textbox}
          value={this.props.reps}
          editable={this.props.id === -1}
          keyboardType="numeric"
        />
        <Text style={styles.multiple}>x</Text>
        <TextInput
          placeholder="Weight"
          onChangeText={weight => this.props.setWeight(String(weight))}
          style={styles.textbox}
          value={this.props.weight}
          editable={this.props.id === -1}
          keyboardType="numeric"
        />
        <Text style={styles.multiple}>kg</Text>
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

export default connect(mapStateToProps)(ExerciseSet);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textbox: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff'
  },
  multiple: {
    flex: 1,
    fontWeight: 'bold'
  }
});
