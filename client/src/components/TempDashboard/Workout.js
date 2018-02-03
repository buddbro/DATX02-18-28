import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

export default class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: '', title: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />

        <TouchableOpacity
          onPress={() => {
            axios
              .post(`http://37.139.0.80/api/workouts/${this.state.id}`, {
                title: this.state.title
              })
              .then(({ data }) => {
                console.log(data);
              })
              .catch(error => {
                console.log(error);
              });
          }}
        >
          <Text style={{ marginLeft: 'auto', marginRight: 10 }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  textInput: {
    height: 60,
    fontSize: 20,
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 3,
    margin: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
