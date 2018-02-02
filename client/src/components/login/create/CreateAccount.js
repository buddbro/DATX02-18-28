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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import NavigationActions from 'react-navigation';
import sha256 from 'sha256';
import { connect } from 'react-redux';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], name: '', email: '', password: '' };
  }

  registerUser() {
    axios
      .post('http://37.139.0.80/api/users/register', {
        email: this.state.email,
        password: sha256(this.state.password),
        name: this.state.name
      })
      .then(({ data }) => {
        console.log(data);

        try {
          AsyncStorage.setItem('@LocalStore:token', data.token).then(t => {
            AsyncStorage.getItem('@LocalStore:token').then(value => {
              this.setState({
                token: data.token
              });
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Workout'
                })
              );
            });
          });
        } catch (error) {
          console.log(error);
        }

        this.setState({ name: '', email: '', password: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    axios
      .get('http://37.139.0.80/api/getall')
      .then(({ data }) => {
        data.forEach(d => (d.key = d.email));
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });
    /*<Button
          onPress={() =>
            this.props.navigation.navigate('Workout', { title: 'Upper body' })}
          title="New Workout"
        />
        <Text>List of items fetched from backend:</Text>*/
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headline}>Welcome</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            secureTextEntry={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email =>
              this.setState({ email: email.toLowerCase() })}
            value={this.state.email}
            secureTextEntry={false}
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
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'LoginUser'
                })
              )}
          >
            <Text style={{ color: '#858080' }}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreateAccount);

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
