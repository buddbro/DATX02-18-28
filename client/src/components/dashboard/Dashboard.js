import React from 'react';
import {
  Animated,
  Button,
  Easing,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';
import moment from 'moment';

import { getQuote } from '../../actions';

import ProfileHeader from './ProfileHeader';
import WorkoutHistory from '../workout/WorkoutHistory';
import WorkoutCard from './WorkoutCard';
import AddWorkout from './AddWorkout';
import CalendarStrip from 'react-native-calendar-strip';
import CustomCalendarStrip from '../utilities/calendar/CalendarStripNew';

import globalStyles from '../../styles/global-styles';

class Dashboard extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/dashboard.png')}
        style={{ width: 26, height: 26, borderRadius: 10 }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      addWorkoutVisible: false,
      selectedDay: moment(),
      selectedWorkout: this.props.workout.workouts[0],
      hasWorkout: this.props.workout.workouts.length === 0,
      loaded: false
    };

    this.animatedValue = new Animated.Value(0);
    this.marginTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-1300, 0]
    });
  }

  componentDidMount() {
    this.props.getQuote();
    this.setState({ loaded: true });
  }

  componentDidUpdate() {
    if (this.state.addWorkoutVisible) {
      this.animate();
    }
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease
    }).start();
  }

  hideModal() {
    this.setState({ addWorkoutVisible: false });
  }

  renderPopup() {
    if (this.state.addWorkoutVisible) {
      return (
        <View style={styles.popupContainer}>
          <Animated.View
            style={{
              marginTop: this.marginTop,
              height: 1,
              width: 1
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({
                addWorkoutVisible: !this.state.addWorkoutVisible
              });
            }}
            style={styles.popupBackground}
          />
          <AddWorkout
            navigation={this.props.navigation}
            hideModal={this.hideModal.bind(this)}
          />
        </View>
      );
    }
  }

  calculatePrecisionTimingDetailsAccordingToDateEtc(date) {
    const tempArray = this.props.workout.workouts.filter(
      workout =>
        moment(workout.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );

    const selectedWorkout = tempArray[0];
    if (selectedWorkout) {
      this.setState({
        selectedWorkout: tempArray[0],
        hasWorkout: true
      });
    } else {
      this.setState({
        selectedWorkout: null,
        hasWorkout: false
      });
    }
  }

  renderWorkoutcard() {
    console.log(this.state.selectedWorkout);
    if (this.state.selectedWorkout) {
      return (
        <WorkoutCard
          workout={this.state.selectedWorkout}
          navigation={this.props.navigation}
          parent="Dashboard"
        />
      );
    } else if (this.state.hasWorkout) {
      return (
        <WorkoutCard
          workout={this.props.workout.workouts[0]}
          navigation={this.props.navigation}
          parent="Dashboard"
        />
      );
    }
    return (
      <View>
        <Text>No workouts for this day...</Text>
      </View>
    );
  }

  renderToday() {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const date = new Date();
    return `${weekdays[date.getUTCDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    }`;
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
          <Text style={globalStyles.headerTitle}>Dashboard</Text>
          <View style={globalStyles.headerFillerItem} />
        </Header>
        <ScrollView>
          <View
            style={
              (globalStyles.centerContentContainer,
              globalStyles.contentContainer)
            }
          >
            <Text style={globalStyles.quoteText}>{this.props.quote}</Text>
            <Text style={(globalStyles.quoteText, globalStyles.authorText)}>
              - {this.props.author}
            </Text>
          </View>
          <View>
            <CalendarStrip
              ref={calendarStrip => (this._calendarStrip = calendarStrip)}
              calendarAnimation={{ type: 'sequence', duration: 30 }}
              daySelectionAnimation={{
                type: 'border',
                duration: 200,
                borderWidth: 1,
                borderHighlightColor: 'white'
              }}
              style={{ height: 100, paddingTop: 10, paddingBottom: 10, marginLeft: 10, marginRight: 10 }}
              calendarHeaderStyle={{ color: 'white' }}
              calendarColor={'#51C1AB'}
              dateNumberStyle={{ color: 'white' }}
              dateNameStyle={{ color: 'white' }}
              highlightDateNumberStyle={{ color: 'white' }}
              highlightDateNameStyle={{ color: 'white' }}
              disabledDateNameStyle={{ color: '#AEEEE1' }}
              disabledDateNumberStyle={{ color: '#AEEEE1' }}
              iconLeft={require('../../../assets/back_white.png')}
              iconRight={require('../../../assets/forward_right.png')}
              iconContainer={{ flex: 0.1 }}
              onDateSelected={date => {
                this.calculatePrecisionTimingDetailsAccordingToDateEtc(date);
              }}
            />
          </View>
          {this.props.workout.workouts.length === 0 ? (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeHeader}>Welcome!</Text>
              <Text style={styles.welcomeText}>
                Start your first workout by tapping the button below.
              </Text>
            </View>
          ) : null}
          <View
            style={
              (globalStyles.columnContentContainer,
              globalStyles.contentContainer)
            }
          >
            {this.renderWorkoutcard()}
            {/* <WorkoutCard
              workout={this.state.selectedWorkout}
              navigation={this.props.navigation}
              parent="Dashboard"
            /> */}
          </View>
        </ScrollView>
        <View style={globalStyles.bigAbsoluteButton}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                addWorkoutVisible: !this.state.addWorkoutVisible
              });
            }}
            style={styles.addWorkoutClean}
          >
            <Text style={styles.menuItemClean}>Lift weights!</Text>
          </TouchableOpacity>
        </View>
        {this.renderPopup()}
      </View>
    );
  }
}

const mapStateToProps = ({ workout, user, app }) => {
  return {
    workout,
    user,
    selectedDate: app.selectedDate,
    quote: app.quote,
    author: app.author
  };
};

export default connect(mapStateToProps, { getQuote })(Dashboard);

const styles = StyleSheet.create({
  menuItemClean: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addWorkoutClean: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#6669cb',
    zIndex: 101
  },
  popupContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 199
  },
  popupBackground: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5,
    width: '150%',
    height: '150%',
    zIndex: 200,
    alignSelf: 'stretch'
  },
  welcomeContainer: { height: 300, justifyContent: 'center' },
  welcomeHeader: { fontSize: 28, textAlign: 'center' },
  welcomeText: { fontSize: 16, textAlign: 'center', padding: 60 }
});
