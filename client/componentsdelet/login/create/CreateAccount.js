import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  List,
  FlatList,
  ListItem,
  TextInput,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], email: '', password: '' };
  }

  registerUser() {
    axios
      .post('https://getpushapp.com/api/users/register', {
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        this.setState({ email: '', password: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headline}>Welcome!</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email =>
              this.setState({ email: email.toLowerCase() })}
            value={this.state.email}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={password =>
              this.setState({ password: password.toLowerCase() })}
            value={this.state.password}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => this.registerUser()}
            style={styles.createAccountButton}
          >
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={{ color: '#858080' }}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    paddingTop: 50
  },
  head: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 2,
    alignItems: 'center'
  },
  headline: {
    margin: 25,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#18957D'
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 3,
    margin: 5
  },
  createAccountButton: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#7AD9C6'
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
