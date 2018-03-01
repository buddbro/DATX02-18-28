import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addWorkout, chooseWorkout } from '../../actions';
import NavigationActions from 'react-navigation';

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addWorkoutVisible: false, waitForWorkout: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.waitForWorkout && nextProps.id >= 0) {
      this.setState({ waitForWorkout: false });
      this.props.chooseWorkout(nextProps.id);
      this.props.navigation.dispatch(
        NavigationActions.NavigationActions.navigate({
          routeName: 'ViewWorkout'
        })
      );
    }
  }

  renderSchedules() {
    return Object.keys(this.props.schedules.list).map(schedule =>
      <TouchableOpacity
        onPress={() => {
          this.setState({ waitForWorkout: true });
          this.props.addWorkout(schedule);
        }}
        key={`schedule${schedule}`}
      >
        <View style={styles.body}>
          <Text style={styles.text}>
            {this.props.schedules.list[schedule].title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderAddMenu() {
    if (this.state.addWorkoutVisible) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ waitForWorkout: true });
              this.props.addWorkout(0);
            }}
          >
            <View style={styles.body}>
              <Text style={styles.text}>Quick Start</Text>
            </View>
          </TouchableOpacity>
          {this.renderSchedules()}
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              addWorkoutVisible: !this.state.addWorkoutVisible
            });
          }}
          style={styles.addWorkout}
        >
          <Text style={styles.menuItem}>+</Text>
        </TouchableOpacity>
        {this.renderAddMenu()}
      </View>
    );
  }
}

const mapStateToProps = ({ schedules, workout }) => {
  return { id: workout.id, schedules };
};

export default connect(mapStateToProps, {
  addWorkout,
  chooseWorkout
})(AddWorkout);

const styles = StyleSheet.create({
  menuItem: {
    color: '#fff',
    fontSize: 100,
    fontWeight: 'bold'
  },
  addWorkout: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    paddingBottom: 15,
    backgroundColor: '#b9baf1'
  },
  container: {
    backgroundColor: '#A6A8E5',
    marginTop: -10,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 10
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 3
  },
  text: {
    fontSize: 18,
    color: '#333',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  }
});
