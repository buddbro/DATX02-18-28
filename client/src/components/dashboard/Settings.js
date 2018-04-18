import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  List,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AppRegistry,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { logout, editUser } from '../../actions';
import NavigationActions from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

var { height, width } = Dimensions.get('window');

class Settings extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/settings.png')}
        style={{ width: 26, height: 26, borderRadius: 10 }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      nameText: '',
      emailText: '',
      ageText: '',
      heightText: '',
      weightText: '',
      newPasswordText: '',
      confirmPasswordText: '',
      notifications: false,
      errorColor: '#992314',
      fieldStyles: {name:globalStyles.textInput, email:globalStyles.textInput,
        newPassword:globalStyles.textInput, confPassword:globalStyles.textInput}
    };
  }

  componentDidMount() {
    this.setState({
      nameText: this.props.name,
      emailText: this.props.email,
      ageText: String(this.props.age),
      weightText: String(this.props.weight),
      heightText: String(this.props.height),
      notifications: this.props.notifications
    });
  }

  focus(component) {
    this.refs[component].focus();
  }

  renderError() {
    if (!this.state.error) {
      return;
    }
    return (
      <Text style={{ fontSize: 18, color: this.state.errorColor, textAlign: 'center' }}>
        {this.state.error}
      </Text>
    );
  }

  save() {
    const user = {
      name: this.state.nameText.trim(),
      email: this.state.emailText,
      age: this.state.ageText,
      //height: this.state.heightText,
      //weight: this.state.weightText,
      //notifications: this.state.notifications
    };
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;
    this.setState({
      errorColor: '#992314',
    });
    if (
      this.state.newPasswordText.length >= 6 &&
      this.state.newPasswordText === this.state.confirmPasswordText
    ) {
      user.password = this.state.newPasswordText;
    }
    if(this.state.nameText.trim() == ''){ //No name
      this.setState({
        fieldStyles: {name:globalStyles.textInputError, email:globalStyles.textInput,
          newPassword:globalStyles.textInput, confPassword:globalStyles.textInput},
        error: 'Name is required'
      });
    }else if(!emailRegex.test(this.state.emailText)){ //Otillåten email
      this.setState({
        fieldStyles: {name:globalStyles.textInput, email:globalStyles.textInputError,
          newPassword:globalStyles.textInput, confPassword:globalStyles.textInput},
        error: 'Please enter a valid email'
      });
    }else if(this.state.newPasswordText.length<6 &&
      this.state.newPasswordText.length != 0){ //För kort password
      this.setState({
        fieldStyles: {name:globalStyles.textInput, email:globalStyles.textInput,
          newPassword:globalStyles.textInputError, confPassword:globalStyles.textInput},
        error: 'Password has to be at least 6 characters'
      });
    }else if(this.state.newPasswordText !== this.state.confirmPasswordText){ //Passwords matchar inte
      this.setState({
        fieldStyles: {name:globalStyles.textInput, email:globalStyles.textInput,
          newPassword:globalStyles.textInputError, confPassword:globalStyles.textInputError},
        error: 'The passwords need to match'
      });
    }else{ //Spara ändringar
    this.props.editUser(user);
    this.setState({
      fieldStyles: {name:globalStyles.textInput, email:globalStyles.textInput,
        newPassword:globalStyles.textInput, confPassword:globalStyles.textInput},
      errorColor: '#92D722',
      error: 'Saved changes!'
    });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={globalStyles.iconSmall}
            />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Settings</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.logout();
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'LoginUser'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/exit.png')}
              style={globalStyles.iconSmall}
            />
          </TouchableOpacity>
        </Header>

        <KeyboardAwareScrollView
          style={{ paddingTop: 20 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          enableOnAndroid={true}
        >
          <View
            style={
              (globalStyles.contentContainer,
              globalStyles.columnContentContainer,
              globalStyles.traitContainer)
            }
          >
            <Text style={globalStyles.pageTitle}>Profile</Text>

            <View style={styles.outerTextContainer}>
              <Text style={globalStyles.traitTitle}>Name</Text>
              <TextInput
                ref="name"
                onFocus={() => this.focus('name')}
                onChangeText={nameText => this.setState({ nameText })}
                value={this.state.nameText}
                autoCorrect={false}
                style={this.state.fieldStyles.name}
              />
            </View>
            <View
              style={
                (globalStyles.contentContainer,
                globalStyles.columnContentContainer)
              }
            >
              <Text style={globalStyles.pageTitle}>Account</Text>
            </View>
            <View style={styles.outerTextContainer}>
              <Text style={globalStyles.traitTitle}>Email</Text>
              <TextInput
                ref="email"
                onFocus={() => this.focus('email')}
                keyboardType="email-address"
                style={styles.standardText}
                onChangeText={emailText => this.setState({ emailText })}
                value={this.state.emailText}
                autoCapitalize="none"
                autoCorrect={false}
                style={this.state.fieldStyles.email}
              />
              <Text style={globalStyles.traitTitle}>New password</Text>
              <TextInput
                ref="passwordOne"
                onFocus={() => this.focus('passwordOne')}
                style={styles.standardText}
                secureTextEntry
                onChangeText={newPasswordText =>
                  this.setState({ newPasswordText })
                }
                value={this.state.newPasswordText}
                style={this.state.fieldStyles.newPassword}
              />
              <Text style={globalStyles.traitTitle}>Confirm password</Text>
              <TextInput
                ref="passwordTwo"
                onFocus={() => this.focus('passwordTwo')}
                style={styles.standardText}
                secureTextEntry
                onChangeText={confirmPasswordText =>
                  this.setState({ confirmPasswordText })
                }
                value={this.state.confirmPasswordText}
                style={this.state.fieldStyles.confPassword}
              />

              {/*<View
              style={{
                paddingTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 10
              }}
            >
              <Text style={styles.biggerStandardText}>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onTintColor="#6669cb"
                onValueChange={notifications =>
                  this.setState({ notifications })
                }
              />*/}
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10
            }}
          >
            {this.renderError()}
            <TouchableOpacity
              style={globalStyles.saveButton}
              onPress={this.save.bind(this)}
            >
              <Text style={styles.buttontext}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

      </View>
    );
  }
}

const mapStateToProps = ({ settings, exercises, user }) => {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    weight: user.weight,
    height: user.height,
    notifications: user.notifications,
    counter: settings.counter,
    exercises: exercises.list
  };
};

//(ta in,skicka ut)
export default connect(mapStateToProps, { logout, editUser })(Settings);

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  outerTextContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 13
  },
  buttontext: {
    color: '#fff',
    fontSize: 23
  },
  biggerStandardText: {
    marginLeft: 8,
    marginRight: 8,
    color: '#6669cb',
    fontSize: 15,
    marginTop: 8
  },
  standardText: {
    color: '#606060',
    fontSize: 15
  },
});
