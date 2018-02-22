import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  List,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { increase, decrease } from '../../actions';
import NavigationActions from 'react-navigation';
var {height, width} = Dimensions.get('window');

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: 'Useless Placeholder',
      emailText: 'Useless Placeholder'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nameText: nextProps.name,
      emailText: nextProps.email
    });
  }

  render() {
    //console.log(this.props.exercises);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
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
          <Text style={styles.heading}>Settings</Text>
          <TouchableOpacity
            style={{
              marginLeft: 10
            }}
            onPress={() => this.props.increase(5)}
          >
            <Image
              source={require('../../../assets/edit.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>PROFILE</Text>
        </View>

        {/*Picture, name, age*/}
        <View style={styles.outerTextContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 20}}>
              <Image
                source={require('../../../assets/avatar_default.png')}
                style={{ width: 110, height: 110 }}
              />
            </View>
            {/*Name and age*/}
            <View>
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
                  onChangeText={nameText => this.setState({ nameText })}
                  value={this.state.nameText}
                />
              </View>
            </View>
          </View>

          {/*Height and weight*/}
          <View style={styles.twoColumnContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.biggerStandardText}>HEIGHT</Text>
              <View style={styles.smallInnerTextContainer}>
                <TextInput
                  style={styles.standardText}
                  onChangeText={nameText => this.setState({ nameText })}
                  value={this.state.nameText}
                />
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.biggerStandardText}>WEIGHT</Text>
              <View style={styles.smallInnerTextContainer}>
                <TextInput
                  style={styles.standardText}
                  onChangeText={nameText => this.setState({ nameText })}
                  value={this.state.nameText}
                />
              </View>
            </View>
          </View>

        {/*Account down*/}
        </View>
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
              onChangeText={nameText => this.setState({ nameText })}
              value={this.state.nameText}
            />
          </View>
          <Text style={styles.biggerStandardText}>CONFIRM PASSWORD</Text>
          <View style={styles.innerTextContainer}>
            <TextInput
              style={styles.standardText}
              onChangeText={nameText => this.setState({ nameText })}
              value={this.state.nameText}
            />
          </View>
          <Text style={styles.biggerStandardText}>NOTIFICATIONS</Text>
        </View>
        <View style={{justifyContent: 'center',
        alignItems: 'center'}}>
          <TouchableOpacity style={styles.button}
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
    marginTop: 15,
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
    justifyContent: 'center',
    backgroundColor: '#8b8ddf',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  innerTextContainer: {
    //flex: 1,
    justifyContent: 'center',
    backgroundColor: '#b9baf1',
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#b9baf1'
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
    width: 80
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
    color: '#ffffff',
    fontSize: 15,
    marginTop: 8
  },
  standardText: {
    color: '#606060',
    fontSize: 15,
  }
});
