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
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';

import CreateAccount from './create/CreateAccount';
import LoginUser from './existing/LoginUser';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import LoginNavigator from '../../containers/LoginNavigator';

class LoginMainTemp extends React.Component {
  render() {
    return (
      <LoginNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.loginNav
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  loginNav: state.loginNav
});

const LoginWithNavigationState = connect(mapStateToProps)(LoginMainTemp);

export default class LoginMain extends React.Component {
  render() {
    return <LoginWithNavigationState />;
  }
}
