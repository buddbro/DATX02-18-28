import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  List,
  FlatList,
  ListItem,
  TextInput
} from 'react-native';
import axios from 'axios';
import LoginMain from './login/LoginMain.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginMain />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
