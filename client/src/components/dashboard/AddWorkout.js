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
import globalStyles from '../../styles/global-styles';

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
    return Object.keys(this.props.schedules.list).map(schedule => (
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
    ));
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
            <Text
              style={[
                globalStyles.pageTitle,
                { color: '#7B7B7B', textAlign: 'center', marginBottom: 30 }
              ]}
            >
              Start a workout
            </Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#AEEEE1',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#7B7B7B'
  },
  text: {
    fontSize: 22,
    color: '#7B7B7B',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  },
  bodySpecial: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#7AD9C6',
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#7B7B7B'
  },
  textSpecial: {
    fontSize: 28,
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  }
});
