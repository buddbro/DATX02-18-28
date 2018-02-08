import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import ExerciseSet from './ExerciseSet';

export default class ExerciseCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { accordionToggled: false}
  }

  toggleAccordion() {
    console.log(this.state.accordionToggled);
    return(
      <View style={styles.accordionBody}>
        <TouchableOpacity>
          <Text>Add set</Text>
        </TouchableOpacity>
        <FlatList
          style={{flex: 1}}
          data={[{key: 'a'}]}
          renderItem={({item}) => <ExerciseSet />}
        />
      </View>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => this.setState({accordionToggled: !this.state.accordionToggled})}
          >
          <Text>Exercise title</Text>
        </TouchableOpacity>

          {this.state.accordionToggled ? this.toggleAccordion() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  accordionHeader: {
    flex: 1,
  },
  accordionBody: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    alignSelf: 'stretch',
  }
});
