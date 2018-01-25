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
import LoginMain from './login/LoginMain.js';
import Workout from './Workout';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Workout />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
