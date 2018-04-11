import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  Image
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import { retrievePassword } from '../../../actions';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  focus(component) {
    this.refs[component].focus();
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
      <ScrollView style={styles.container} scrollEnabled={false}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start', marginLeft: 15, marginBottom: '20%' }}
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'LoginUser'
              })
            );
          }}
        >
          <Image
            source={require('../../../../assets/006-back.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <View style={styles.head}>

          <Text style={styles.headline}>Reset your password</Text>
          <Text style={styles.breadtext}>
            A message will be sent to your email with a link to choose a new
            password.
          </Text>
        </View>

        <View style={styles.body}>

          <TextInput
            onBlur={() => Keyboard.dismiss}
            ref="email"
            onFocus={() => this.focus('email')}
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
      </ScrollView>

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
    paddingTop: 50
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
    color: '#6669CB',
    paddingBottom: 40
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
