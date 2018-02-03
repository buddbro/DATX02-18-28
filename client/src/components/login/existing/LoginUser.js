import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../../actions';
import NavigationActions from 'react-navigation';

import sha256 from 'sha256';
import axios from 'axios';

class LoginUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', token: '' };
  }

  componentDidMount() {
    this.props.navigation.dispatch(
      NavigationActions.NavigationActions.navigate({
        routeName: 'WorkoutList'
      })
    );
  }

  login() {
    axios
      .post('http://37.139.0.80/api/users/login', {
        email: this.state.email,
        password: sha256(this.state.password)
      })
      .then(({ data }) => {
        try {
          AsyncStorage.setItem('@LocalStore:token', data.token).then(t => {
            AsyncStorage.getItem('@LocalStore:token').then(value => {
              this.setState({
                token: data.token
              });
              this.props.login(data);
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

        this.setState({ email: '', password: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let { dispatch } = this.props.navigation;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headline}>Welcome back igen!</Text>
        </View>

        <View style={styles.body}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email =>
              this.setState({ email: email.toLowerCase() })}
            value={this.state.email}
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
            onPress={this.login.bind(this)}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'CreateAccount'
                })
              )}
          >
            <Text style={{ color: '#858080' }}>
              Don't have an account yet? Create one!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { login })(LoginUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    paddingTop: 35
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
    color: '#6669CB'
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
  loginButton: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#8B8DDF'
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
