import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';


class WorkoutLog extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

  return (
    <TouchableOpacity
    onPress={() =>
      this.props.navigation.dispatch(
        NavigationActions.NavigationActions.navigate({
          routeName: 'ViewWorkout'
        })
      )}
      style={styles.addWorkout}>
        <Text style={styles.plusSign}>
          {this.props.title}
        </Text>
    </TouchableOpacity>
  );
}
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps)(WorkoutLog);

const styles = StyleSheet.create ({
  addWorkout: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: window.innerWidth,
    borderRadius: 5,
    paddingBottom: 5,
    backgroundColor: '#7AD9C6'
  },
  plusSign: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
