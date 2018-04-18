import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
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

  focus(component) {
    this.refs[component].focus();
  }

  render() {
    const backgroundColor = this.props.index % 2 === 0 ? '#aeeee1' : '#98e0d2';
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={{ width: '20%' }}>
          <Text style={{ textAlign: 'center', color: '#505050' }}>
            SET {this.props.index + 1}
          </Text>
        </View>
        {this.props.id !== -1 ? (
          <View style={styles.inputContainer}>
            <Text style={styles.textbox}>{this.props.reps}</Text>
            <Text style={styles.textbox}>{this.props.weight}</Text>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              ref="reps"
              onFocus={() => this.focus('reps')}
              placeholder="Reps"
              onChangeText={reps => this.props.setReps(String(reps))}
              style={styles.textbox}
              value={this.props.reps}
              keyboardType="numeric"
            />
            <TextInput
              ref="weight"
              onFocus={() => this.focus('weight')}
              placeholder="Weight"
              onChangeText={weight => this.props.setWeight(String(weight))}
              style={styles.textbox}
              value={this.props.weight}
              keyboardType="numeric"
            />
          </View>
        )}

        {/*  <TouchableOpacity
          onPress={() => {

          }}
        >
          <Image
            source={require('../../../assets/delete.png')}
            style={{ width: 20, height: 20, marginRight: 10}}
          />
        </TouchableOpacity>*/}
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
  inputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  textbox: {
    color: '#505050',
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
    width: '40%'
  }
});
