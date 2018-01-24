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

export default class LoginMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], email: '', password: '' };
    };

  registerUser() {
    axios
      .post('http://37.139.0.80/api/users/register', {
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({ email: '', password: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
      axios
        .get('http://37.139.0.80/api/getall')
        .then(({ data }) => {
          data.forEach(d => (d.key = d.email));
          this.setState({ data });
        })
        .catch(error => {
          console.log(error);
        });
        /*<Button
          onPress={() =>
            this.props.navigation.navigate('Workout', { title: 'Upper body' })}
          title="New Workout"
        />
        <Text>List of items fetched from backend:</Text>*/
    return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>Register / Login:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => this.setState({ email: email.toLowerCase() })}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={password =>
              this.setState({ password: password.toLowerCase() })}
            value={this.state.password}
          />
          <Button onPress={() => this.registerUser()} title="Register" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    },
    textInput: {
      height: 40,
      width: 200,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 3
    }
});
