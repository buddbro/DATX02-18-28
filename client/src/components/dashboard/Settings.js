import React from 'react';
import {
  Image,
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
      <View style={styles.container}>
        <View
          style={styles.headerContainer}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Workout'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow.png')}
              style={{ width: 35, height: 35,}}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Settings</Text>
          <TouchableOpacity
            style={{
              marginLeft: 10
            }}
            onPress={() => this.props.increase(5)}
          >
            <Image
              source={require('../../../assets/edit.png')}
              style={{ width: 30, height: 30,}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.standardText}>Name: </Text>
          <Text style={styles.standardText}>{this.props.name}</Text>
          <Text style={styles.standardText}>Email: </Text>
          <Text style={styles.standardText}>{this.props.email}</Text>
          <Text style={styles.standardText}>{this.props.counter}</Text>
          <Button onPress={() => this.props.increase(5)} title="Increase" />
          <Button onPress={() => this.props.decrease()} title="Decrease" />
        </View>
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
  textContainer: {
    backgroundColor: '#8b8ddf',
    marginTop: 15,
    marginLeft: 15
  },
  heading: {
    color: '#ffffff',
    fontSize: 35
  },
  standardText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  },
});
