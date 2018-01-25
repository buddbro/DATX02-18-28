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
import {
  TabNavigator,
} from 'react-navigation';

import CreateAccount from './create/CreateAccount';
import LoginUser from './existing/LoginUser';

export default class LoginMain extends React.Component {
    constructor(props) {
      super(props);
    };

    render() {
        return (
            <LoginNavigation />
        );
    }
}

const LoginNavigation = TabNavigator({
    Create: { screen: CreateAccount },
    Login: { screen: LoginUser },
}, {
    navigationOptions: {
        tabBarVisible: false,
    },
},
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
     // justifyContent: 'center',
      paddingTop: 50,
    },
});
