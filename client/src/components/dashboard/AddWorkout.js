import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
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
      this.props.hideModal();
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
          this.props.addWorkout(Number(schedule));
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
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollcontainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ waitForWorkout: true });
              this.props.addWorkout(0);
            }}
          >
            <View style={styles.bodySpecial}>
              <Text style={styles.textSpecial}>Quick Start</Text>
            </View>
          </TouchableOpacity>
          {this.renderSchedules()}
        </ScrollView>
      </View>
    );
  }

  render() {
    return this.renderAddMenu();
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
  container: {
    top: 0,
    width: '80%',
    backgroundColor: '#d3d4f7',
    paddingBottom: 10,
    marginTop: 50,
    marginBottom: 50,
    zIndex: 999,
    borderRadius: 4,
    borderColor: '#d3d4f7'
  },
  scrollcontainer: {
    paddingBottom: 10,
    paddingTop: 10
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6669cb'
  },
  text: {
    fontSize: 18,
    color: '#6669cb',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  },
  bodySpecial: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#E2FBF6',
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6669cb'
  },
  textSpecial: {
    fontSize: 18,
    color: '#6669cb',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  }
});
