import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

class ExerciseHelp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>


      </View>
    );
  }
}
const mapStateToProps = ({ app }) => {
  return { description: app.exerciseHelp };
};

export default connect(mapStateToProps, {})(ExerciseHelp);

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(102, 105, 203, 0.7)',
    width: '100%',
    height: '100%',
    zIndex: -999
  },
  container: {
    position: 'absolute',
    backgroundColor: '#B9BAF1',
    borderRadius: 3,
    marginRight: '10%',
    marginLeft: '10%',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row'
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  body: {
    flex: 4,
    flexDirection: 'column'
  }
});
