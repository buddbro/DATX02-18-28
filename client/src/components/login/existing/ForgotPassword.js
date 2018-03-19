import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import { retrievePassword } from '../../../actions';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  renderResponse() {
    if (!this.props.sent) {
      return null;
    }
    return this.props.resetStatus
      ? <Text style={styles.accept}>
          A link for resetting your password was sent, please check your email.
        </Text>
      : <Text style={styles.denied}>Email not registered.</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-start', marginLeft: 15 }}
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'LoginUser'
                })
              );
            }}
          >
            <Text style={{ fontSize: 20, color: '#000' }}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headline}>Reset your password</Text>
          <Text style={styles.breadtext}>
            An email will be sent to your email with a link to choose a new
            password.
          </Text>
        </View>

        <View style={styles.body}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email =>
              this.setState({ email: email.toLowerCase() })}
            // value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="send"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.props.retrievePassword(this.state.email);
            }}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
          {this.renderResponse()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { resetStatus: user.resetStatus, sent: user.sent };
};

export default connect(mapStateToProps, { retrievePassword })(ForgotPassword);

const styles = StyleSheet.create({
  accept: {
    color: 'green',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  denied: {
    color: 'red',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    paddingTop: 35
  },
  breadtext: {
    textAlign: 'center',
    margin: 15
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
