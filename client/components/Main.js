import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  List,
  FlatList,
  ListItem
} from 'react-native';
import axios from 'axios';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  static navigationOptions = {
    title: 'Kandidatarbete'
  };

  render() {
    axios
      .get('http://37.139.0.80/api/getall')
      .then(({ data }) => {
        data.forEach(d => (d.key = d.id));
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });

    return (
      <View style={styles.container}>
        <Text>Header</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('Workout', { title: 'Upper body' })}
          title="New Workout"
        />
        <Text>List of items fetched from backend:</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <Text>
              {item.text}
            </Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
