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

  constructor(props) {
      super(props);
      this.state = { text: 'Useless Placeholder' };
    }

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
        <View style={styles.outerTextContainer}>
          <Text style={styles.biggerStandardText}>NAME: </Text>
          <View style={styles.innerTextContainer}>
            {/*<TextInput
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}/>*/}
            <Text style={styles.standardText}>{this.props.name}</Text>
          </View>
          <Text style={styles.biggerStandardText}>EMAIL: </Text>
          <View style={styles.innerTextContainer}>
            <Text style={styles.standardText}>{this.props.email}</Text>
          </View>
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
    backgroundColor: '#6669cb',
    paddingTop: 40
  },
  headerContainer: {
    backgroundColor: '#6669cb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  outerTextContainer: {
    justifyContent: 'center',
    backgroundColor: '#8b8ddf',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#8b8ddf'
  },
  innerTextContainer: {
    justifyContent: 'center',
    backgroundColor: '#b9baf1',
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b9baf1'
  },
  heading: {
    color: '#ffffff',
    fontSize: 35
  },
  biggerStandardText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8
  },
  standardText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  },
});
