import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Excercise from './Excercise';

export default class ExcerciseList extends React.PureComponent {
  keyExtractor = (item, index) => item.id;

  constructor(props) {
    super(props);

    this.props.excerciseItems = {['Benchpress', 'Squat', 'Deadlift']}
  }

  renderItem() {
    return(
      <Excercise />
    )
  }

  render() {
    return(
      <View style={styles.container}>
      <FlatList
        data={this.props.excerciseItems}
        renderItem={({item}) => <Text>{item.key}</Text>}
        style={styles.list}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  list: {
    flex: 1,
  },
});
