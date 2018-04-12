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
import { loginWithToken } from '../../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      name: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: ''
    };
  }

  registerUser() {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;

    if (!emailRegex.test(this.state.email)) {
      this.setState({
        error: 'Please enter a valid email'
      });
      return;
    } else if (this.state.passwordOne.length < 6) {
      this.setState({
        error: 'Password has to be at least 6 characters'
      });
      return;
    } else if (this.state.passwordOne !== this.state.passwordTwo) {
      this.setState({
        error: 'The passwords does not match'
      });
      return;
    } else if (this.state.name.length < 2) {
      this.setState({
        error: 'Name is required'
      });
      return;
    }

    axios
      .post('https://getpushapp.com/api/users/register', {
        email: this.state.email,
        password: sha256(this.state.passwordOne),
        name: this.state.name
      })
      .then(({ data }) => {
        if (data.error) {
          this.setState({ error: data.error });
          return;
        }

        AsyncStorage.setItem('jwt', data.token).then(() => {
          this.props.loginWithToken();
          this.props.navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'Dashboard'
            })
          );
        });

        this.setState({
          name: '',
          email: '',
          passwordOne: '',
          passwordTwo: ''
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderError() {
    if (!this.state.error) {
      return;
    }
    return (
      <Text style={{ fontSize: 18, color: '#992314', textAlign: 'center' }}>
        {this.state.error}
      </Text>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <View style={styles.head}>
          <Text style={styles.headline}>Create Account</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            secureTextEntry={false}
            underlineColorAndroid="transparent"
            autoCapitalize="words"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email =>
              this.setState({ email: email.toLowerCase() })
            }
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={password => this.setState({ passwordOne: password })}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password, again"
            onChangeText={password => this.setState({ passwordTwo: password })}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {this.renderError()}

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
              )
            }
          >
            <Text style={{ color: '#858080' }}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { token: user.token };
};

export default connect(mapStateToProps, { loginWithToken })(CreateAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 20
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
