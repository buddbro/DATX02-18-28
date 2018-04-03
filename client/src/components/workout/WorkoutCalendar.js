import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import WorkoutLog from './WorkoutLog';
import axios from 'axios';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';
import { Calendar, CalendarList } from 'react-native-calendars';
import PopupDialog from 'react-native-popup-dialog';

import Header from '../utilities/Header';
import LatestWorkout from '../dashboard/LatestWorkout';

class WorkoutCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedDay: '' };
  }
  static navigationOptions = {
    drawerIcon: () =>
      <Image
        source={require('../../../assets/time.png')}
        style={{ width: 24, height: 24 }}
      />
  };

  getWorkoutDates() {
    return this.props.workouts.reduce((acc, next) => {
      const date = next.date.substring(0, 10);
      return {
        ...acc,
        [date]: {
          selected: true,
          selectedColor: '#b9baf1'
        }
      };
    }, {});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor="#b9baf1">
          <View />
          <Text style={styles.headerTitle}>History</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <PopupDialog
          height={445}
          dialogStyle={{ borderRadius: 0 }}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <ScrollView style={{ height: '100%', padding: 0 }}>
            <LatestWorkout
              style={{ marginBottom: 0 }}
              navigation={this.props.navigation}
            />
          </ScrollView>
        </PopupDialog>
        <CalendarList
          onDayPress={day => {
            this.setState({ selectedDay: day });
            this.popupDialog.show();
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#F2FEFC',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00EFC0',
            selectedDayTextColor: '#000',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 12
          }}
          markedDates={this.getWorkoutDates()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ workout }) => {
  return {
    workouts: workout.workouts
  };
};

export default connect(mapStateToProps)(WorkoutCalendar);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerTitle: {
    fontSize: 32,
    color: 'white'
  },
  headline: {
    fontSize: 32,
    color: 'gray'
  },
  headlineSmall: {
    fontSize: 24,
    color: '#b9baf1',
    fontWeight: '200',
    marginRight: 10
  },
  item: { marginBottom: 20 },
  text: {},
  separator: {}
});
