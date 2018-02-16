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
import { connect } from 'react-redux';
import { increase, decrease } from '../../actions';

class Settings extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 100, marginLeft: 50 }}>
        <Text>hej</Text>
        <Text>
          {this.props.counter}
        </Text>
        <Button onPress={() => this.props.increase(5)} title="Increase" />
        <Button onPress={() => this.props.decrease()} title="Decrease" />
      </View>
    );
  }
}

const mapStateToProps = ({ settings, exercises }) => {
  return {
    counter: settings.counter,
    exercises: exercises.list
  };
};

const mapDispatchToProps = { increase, decrease };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
