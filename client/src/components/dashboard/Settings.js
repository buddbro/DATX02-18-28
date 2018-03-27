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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

var { height, width } = Dimensions.get('window');

//TODO in Settings
//Image

class Settings extends React.Component {
  static navigationOptions = {
    drawerIcon: () =>
      <Image
        source={require('../../../assets/settings.png')}
        style={{ width: 24, height: 24, borderRadius: 10 }}
      />
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
        {/*Header (settings, edit)*/}
        <Header backgroundColor = "#b9baf1">
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
              style={{ width: 35, height: 35}}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Settings</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#fff' }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          enableOnAndroid={true}
        >
          {/*Profile*/}
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeading}>PROFILE</Text>
          </View>

          {/*Picture, name, age*/}
          <View style={styles.outerTextContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                <Image
                  source={require('../../../assets/avatar_default.png')}
                  style={{ width: 110, height: 110 }}
                />
              </View>
              {/*Name and age*/}
              <View style={{ flex: 1 }}>
                <Text style={styles.biggerStandardText}>NAME</Text>
                <View style={styles.innerTextContainer}>
                  <TextInput
                    style={styles.standardText}
                    onChangeText={nameText => this.setState({ nameText })}
                    value={this.state.nameText}
                    autoCorrect={false}
                  />
                </View>
                <Text style={styles.biggerStandardText}>AGE (yr)</Text>
                <View style={styles.innerTextContainer}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.standardText}
                    onChangeText={ageText => this.setState({ ageText })}
                    value={this.state.ageText}
                  />
                </View>
              </View>
            </View>

            {/*Height and weight*/}
            <View style={styles.twoColumnContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.biggerStandardText}>HEIGHT (cm)</Text>
                <View style={styles.smallInnerTextContainer}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.standardTextCentered}
                    onChangeText={heightText => this.setState({ heightText })}
                    value={this.state.heightText}
                  />
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.biggerStandardText}>WEIGHT (kg)</Text>
                <View style={styles.smallInnerTextContainer}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.standardTextCentered}
                    onChangeText={weightText => this.setState({ weightText })}
                    value={this.state.weightText}
                  />
                </View>
              </View>
            </View>
          </View>

          {/*Account and down*/}
          <View style={{ height: 25 }} />
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeading}>ACCOUNT</Text>
          </View>
          <View style={styles.outerTextContainer}>
            <Text style={styles.biggerStandardText}>EMAIL </Text>
            <View style={styles.innerTextContainer}>
              <TextInput
                keyboardType="email-address"
                style={styles.standardText}
                onChangeText={emailText => this.setState({ emailText })}
                value={this.state.emailText}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Text style={styles.biggerStandardText}>NEW PASSWORD</Text>
            <View style={styles.innerTextContainer}>
              <TextInput
                style={styles.standardText}
                secureTextEntry
                onChangeText={newPasswordText =>
                  this.setState({ newPasswordText })}
                value={this.state.newPasswordText}
              />
            </View>
            <Text style={styles.biggerStandardText}>CONFIRM PASSWORD</Text>
            <View style={styles.innerTextContainer}>
              <TextInput
                style={styles.standardText}
                secureTextEntry
                onChangeText={confirmPasswordText =>
                  this.setState({ confirmPasswordText })}
                value={this.state.confirmPasswordText}
              />
            </View>

            {/*Notifications and togglebutton*/}
            <View
              style={{
                paddingTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 10
              }}
            >
              <Text style={styles.biggerStandardText}>NOTIFICATIONS</Text>
              <Switch
                value={this.state.notifications}
                onTintColor="#6669cb"
                onValueChange={notifications =>
                  this.setState({ notifications })}
              />
            </View>
          </View>
          {/*Save button*/}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10
            }}
          >
            <TouchableOpacity
              style={styles.button}
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
    backgroundColor: '#d3d4f7',
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
