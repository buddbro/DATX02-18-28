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
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

import Header from '../utilities/Header';
import WorkoutCard from '../dashboard/WorkoutCard';
import globalStyles, { colors } from '../../styles/global-styles';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
});

class WorkoutCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { workoutsThisDay: [] };
  }
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/time.png')}
        style={{ width: 24, height: 24 }}
      />
    )
  };

  getWorkoutDates() {
    const translateColor = color => {
      switch (color) {
        case 'yellow':
          return colors.yellow;
        case 'red':
          return colors.red;
        case 'green':
          return colors.green;
        case 'blue':
          return colors.blue;
        case 'purple':
          return colors.purple;
        default:
          return '#00ff00';
      }
    };

    return this.props.workouts.reduce((acc, next) => {
      const date = next.date.substring(0, 10);
      return {
        ...acc,
        [date]: {
          selected: true,
          selectedColor: translateColor(next.color)
        }
      };
    }, {});
  }

  render() {
    return (
      <View style={globalStyles.root}>
        <Header>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={globalStyles.iconSmall}
            />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Calendar</Text>
          <View style={globalStyles.headerFillerItem} />
        </Header>
        <PopupDialog
          height={450}
          dialogStyle={{ borderRadius: 0 }}
          dialogAnimation={slideAnimation}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <ScrollView>
            {this.state.workoutsThisDay.map(workout => (
              <WorkoutCard
                style={{ marginBottom: 0 }}
                navigation={this.props.navigation}
                key={`workoutcard${workout.id}`}
                workout={workout}
                parent="Calendar"
                callback={() => this.popupDialog.dismiss()}
              />
            ))}
          </ScrollView>
        </PopupDialog>
        <CalendarList
          onDayPress={day => {
            const workoutsThisDay = this.props.workouts.filter(
              workout => workout.date.substring(0, 10) === day.dateString
            );
            this.setState({ workoutsThisDay });
            if (workoutsThisDay.length !== 0) {
              this.popupDialog.show();
            }
          }}
          firstDay={1}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00EFC0',
            selectedDayTextColor: '#000',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: colors.themeMainColor,
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
