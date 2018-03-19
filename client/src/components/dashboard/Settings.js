import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  List,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AppRegistry
} from 'react-native';
import { connect } from 'react-redux';
import { increase, decrease } from '../../actions';
import NavigationActions from 'react-navigation';
import ToggleSwitch from 'toggle-switch-react-native';

var { height, width } = Dimensions.get('window');

//TODO in Settings
//notifications togglebutton
//Image
//implement savebutton
//take age, height, weight from database

class Settings extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/settings.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      //klara
      nameText: '',
      emailText: '',
      //ej klara
      ageText: '23',
      heightText: '190cm',
      weightText: '90kg',
      newPasswordText: '',
      confirmPasswordText: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nameText: nextProps.name,
      emailText: nextProps.email
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/*Header (back, settings, edit)*/}
        <View style={styles.headerContainer}>
          {/*back icon*/}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'Dashboard'
                  })
                );
              }}
            >
              <Image
                source={require('../../../assets/back_arrow.png')}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          </View>
          {/*Settings text*/}
          <View>
            <Text style={styles.heading}>Settings</Text>
          </View>
          {/*View to fix alignment n stuff*/}
          <View style={{ flex: 1 }} />
        </View>

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
                />
              </View>
              <Text style={styles.biggerStandardText}>AGE</Text>
              <View style={styles.innerTextContainer}>
                <TextInput
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
              <Text style={styles.biggerStandardText}>HEIGHT</Text>
              <View style={styles.smallInnerTextContainer}>
                <TextInput
                  style={styles.standardTextCentered}
                  onChangeText={heightText => this.setState({ heightText })}
                  value={this.state.heightText}
                />
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.biggerStandardText}>WEIGHT</Text>
              <View style={styles.smallInnerTextContainer}>
                <TextInput
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
              style={styles.standardText}
              onChangeText={emailText => this.setState({ emailText })}
              value={this.state.emailText}
            />
          </View>
          <Text style={styles.biggerStandardText}>NEW PASSWORD</Text>
          <View style={styles.innerTextContainer}>
            <TextInput
              style={styles.standardText}
              secureTextEntry
              onChangeText={newPasswordText =>
                this.setState({ newPasswordText })
              }
              value={this.state.newPasswordText}
            />
          </View>
          <Text style={styles.biggerStandardText}>CONFIRM PASSWORD</Text>
          <View style={styles.innerTextContainer}>
            <TextInput
              style={styles.standardText}
              secureTextEntry
              onChangeText={confirmPasswordText =>
                this.setState({ confirmPasswordText })
              }
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
            <ToggleSwitch
              isOn={false}
              onColor="#6669cb"
              offColor="#b9baf1"
              size="medium"
              onToggle={isOn => console.log('changed to : ', isOn)}
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
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          >
            <Text style={styles.buttontext}>SAVE</Text>
          </TouchableOpacity>
        </View>
        {/*<Text style={styles.standardText}>{this.props.counter}</Text>
        <Button onPress={() => this.props.increase(5)} title="Increase" />
        <Button onPress={() => this.props.decrease()} title="Decrease" />*/}
        {/*<TextInput placeholder="Enter password"/>*/}
      </View>
    );
  }
}

const mapStateToProps = ({ settings, exercises, user }) => {
  return {
    name: user.name,
    email: user.email,
    counter: settings.counter,
    exercises: exercises.list
  };
};

const mapDispatchToProps = { increase, decrease };

//(ta in,skicka ut)
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

//Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8b8ddf',
    paddingTop: 40
  },
  headerContainer: {
    backgroundColor: '#8b8ddf',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  subHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#8b8ddf',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  innerTextContainer: {
    justifyContent: 'center',
    backgroundColor: '#b9baf1',
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#b9baf1',
    marginLeft: 8,
    marginRight: 8,
    height: 30
  },
  smallInnerTextContainer: {
    justifyContent: 'center',
    backgroundColor: '#b9baf1',
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#b9baf1',
    width: 85,
    height: 30
  },
  button: {
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#6669cb',
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#6669cb'
  },
  buttontext: {
    color: '#ffffff',
    fontSize: 23
  },
  heading: {
    color: '#ffffff',
    fontSize: 22
  },
  subHeading: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  biggerStandardText: {
    marginLeft: 8,
    marginRight: 8,
    color: '#ffffff',
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
