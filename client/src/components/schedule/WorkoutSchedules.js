import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import { addSchedule } from '../../actions';

import ScheduleCard from './ScheduleCard';
import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

class WorkoutSchedules extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/schedules.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
    )
  };

  constructor(props) {
    super(props);

    this.state = { addWorkoutModalVisible: false, title: '' };
  }

  addSchedule() {
    this.setState({ addWorkoutModalVisible: false });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        enableOnAndroid={true}
      >
        <Header backgroundColor="#b9baf1">
          <TouchableOpacity
            onPress={() => {
              this.props.addSchedule();
            }}
          >
            <Text
              style={{
                fontSize: 56,
                color: '#fff',
                fontWeight: '200'
              }}
            >
              +
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Schedules</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <ScrollView>
          {Object.keys(this.props.list).map((id, index) => (
            <ScheduleCard
              key={`schedule${index}`}
              title={this.props.list[id].title}
              id={id}
              exercises={this.props.list[id].exercises}
              navigation={this.props.navigation}
            />
          ))}
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ schedules }) => {
  return {
    list: schedules.list
  };
};

export default connect(mapStateToProps, { addSchedule })(WorkoutSchedules);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  headerTitle: {
    fontSize: 32,
    color: 'white'
  },
  headline: {
    fontSize: 32,
    color: '#b9baf1'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 200
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#81c1ab'
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 3,
    margin: 5
  }
});
