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
import NavigationActions from 'react-navigation';

class Settings extends React.Component {
  render() {

    //console.log(this.props.exercises);

    return (
      <View style={{ marginTop: 100, marginLeft: 50 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'Workout'
              })
            );
          }}
          style={styles.addWorkout}
        >
        <Text style={styles.standardText}>back</Text>
        </TouchableOpacity>
        <Text style={styles.standardText}>Name: </Text>
        <Text>{this.props.name}</Text>
        <Text style={this.props.standardText}>Email: </Text>
        <Text>{this.props.email}</Text>
        <Button onPress={() => this.props.increase(5)} title="Edit information" />
        <Text>{this.props.counter}</Text>
        <Button onPress={() => this.props.increase(5)} title="Increase" />
        <Button onPress={() => this.props.decrease()} title="Decrease" />
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
  addWorkout: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    paddingBottom: 15,
    backgroundColor: '#b9baf1'
  },
  standardText: {
    //color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  item: { marginBottom: 20 },
  text: {},
  separator: {}
});
