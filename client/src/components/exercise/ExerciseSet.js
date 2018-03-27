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
    const backgroundColor = this.props.index % 2 === 0 ? '#d3d4f7' : '#c6c6f4';
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={{ width: '20%' }}>
          <Text style={{ textAlign: 'center', color: '#6669cb' }}>
            SET {this.props.index + 1}
          </Text>
        </View>
        <TextInput
          ref="reps"
          onFocus={() => this.focus('reps')}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="Reps"
          onChangeText={reps => this.props.setReps(String(reps))}
          style={styles.textbox}
          value={this.props.reps}
          editable={this.props.id === -1}
          keyboardType="numeric"
        />
        <TextInput
          ref="weight"
          onFocus={() => this.focus('weight')}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="Weight"
          onChangeText={weight => this.props.setWeight(String(weight))}
          style={styles.textbox}
          value={this.props.weight}
          editable={this.props.id === -1}
          keyboardType="numeric"
        />
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
  textbox: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
    width: '40%'
  },
  multiple: {
    flex: 1,
    fontWeight: 'bold'
  }
});
