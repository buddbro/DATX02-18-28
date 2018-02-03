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

    //bytas ut med data från backend
    this.props.bigparts = {['Benchpress', 'Squat', 'Deadlift']}
    this.props.smallparts = {['Bicep curl', 'Tricep extension', 'Crunches']}
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
        <SectionList
          style={styles.list}
          renderItem={({item}) => <ListItem title={item} />}
          renderSectionHeader={({section}) => <Header title={section.title} />}
          sections={[ // homogeneous rendering between sections
            {data: [...], title: ...},
            {data: [...], title: ...},
            {data: [...], title: ...},
          ]}
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
