import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  List,
  FlatList,
  ListItem,
  TextInput
} from 'react-native';
import axios from 'axios';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], email: '', password: '' };
  }

  static navigationOptions = {
    title: 'Kandidatarbete'
  };

  registerUser() {
    axios
      .post('http://37.139.0.80/api/users/register', {
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({ email: '', password: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    axios
      .get('http://37.139.0.80/api/getall')
      .then(({ data }) => {
        // console.log(data);
        data.forEach(d => (d.key = d.email));
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });

    return (
      <View style={styles.container}>
        <Button
          onPress={() =>
            this.props.navigation.navigate('Workout', { title: 'Upper body' })}
          title="New Workout"
        />
        <Text>List of items fetched from backend:</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <Text>
              {item.email}
            </Text>}
        />
        <Text style={{ margin: 10 }}>Register / Login:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={email => this.setState({ email: email.toLowerCase() })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={password =>
            this.setState({ password: password.toLowerCase() })}
          value={this.state.password}
        />
        <Button onPress={() => this.registerUser()} title="Register" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 3
  }
});
