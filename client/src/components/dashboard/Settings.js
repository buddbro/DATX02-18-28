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

//TODO in Settings
//Image

class Settings extends React.Component {
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
      notifications: false
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

  save() {
    const user = {
      name: this.state.nameText,
      email: this.state.emailText,
      age: this.state.ageText,
      height: this.state.heightText,
      weight: this.state.weightText,
      notifications: this.state.notifications
    };
    if (
      this.state.newPasswordText.length >= 6 &&
      this.state.newPasswordText === this.state.confirmPasswordText
    ) {
      user.password = this.state.newPasswordText;
    }

    this.props.editUser(user);
    this.props.navigation.dispatch(
      NavigationActions.NavigationActions.navigate({
        routeName: 'Dashboard'
      })
    );
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
          contentContainerStyle={styles.container}
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
                style={globalStyles.textInput}
              />
              {/*
            <View style={globalStyles.threeColumnContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={globalStyles.traitTitle}>Age</Text>
                <TextInput
                  ref="age"
                  onFocus={() => this.focus('age')}
                  keyboardType="numeric"
                  onChangeText={ageText => this.setState({ ageText })}
                  value={this.state.ageText}
                  style={globalStyles.numberInput}
                />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={globalStyles.traitTitle}>Height</Text>
                <TextInput
                  ref="height"
                  onFocus={() => this.focus('height')}
                  keyboardType="numeric"
                  onChangeText={heightText => this.setState({ heightText })}
                  value={this.state.heightText}
                  style={globalStyles.numberInput}
                />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={globalStyles.traitTitle}>Weight</Text>
                <TextInput
                  ref="weight"
                  onFocus={() => this.focus('weight')}
                  keyboardType="numeric"
                  onChangeText={weightText => this.setState({ weightText })}
                  value={this.state.weightText}
                  style={globalStyles.numberInput}
                />
              </View>
            </View>
          </View>

            <View style={styles.twoColumnContainer} />*/}
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
                style={globalStyles.textInput}
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
                style={globalStyles.textInput}
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
                style={globalStyles.textInput}
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
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#6669cb',
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#6669cb'
  },
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '15%',
    marginRight: '15%'
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
  innerTextContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 8,
    marginRight: 8,
    height: 30
  },
  smallInnerTextContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    width: 85,
    height: 30
  },
  button: {
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#6669cb',
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#6669cb'
  },
  buttontext: {
    color: '#fff',
    fontSize: 23
  },
  heading: {
    fontSize: 30,
    color: '#fff'
  },
  subHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
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
  standardTextCentered: {
    textAlign: 'center',
    color: '#606060',
    fontSize: 15
  }
});
