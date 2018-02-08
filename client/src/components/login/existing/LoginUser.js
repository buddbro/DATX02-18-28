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
import { loginWithPassword } from '../../../actions';
import { fetchWorkouts } from '../../../actions';
import NavigationActions from 'react-navigation';

class LoginUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token && (nextProps.email || this.state.email)) {
      try {
        AsyncStorage.setItem(
          'token',
          nextProps.token + (nextProps.email || this.state.email)
        ).then(() => {
          AsyncStorage.getItem('token').then(() => {
            this.setState({ email: '', password: '' });
            this.props.fetchWorkouts(nextProps.id, nextProps.token);

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
    }
  }

  componentDidMount() {
    let { dispatch } = this.props.navigation;
  }

  renderError() {
    if (!this.props.error) {
      return;
    }
    return (
      <Text style={{ fontSize: 18, color: '#992314', textAlign: 'center' }}>
        {this.props.error}
      </Text>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.props.loading) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headline}>PushApp</Text>
        </View>

        <View style={styles.body}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => {
              this.setState({ email: email.toLowerCase() });
            }}
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

          {this.renderError()}

          <TouchableOpacity
            onPress={() =>
              this.props.loginWithPassword(
                this.state.email,
                this.state.password
              )}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'CreateAccount'
                })
              );
            }}
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

const mapStateToProps = ({ user }) => {
  const { loading, id, email, token, error } = user;
  return { loading, id, email, token, error };
};

export default connect(mapStateToProps, { loginWithPassword, fetchWorkouts })(
  LoginUser
);

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
