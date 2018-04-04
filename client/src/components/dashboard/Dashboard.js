import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Image,
  Animated,
  Easing
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

import { getQuote } from '../../actions';

import ProfileHeader from './ProfileHeader';
import WorkoutHistory from '../workout/WorkoutHistory';
import LatestWorkout from './LatestWorkout';
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
    this.state = { addWorkoutVisible: false };
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.props.getQuote();
  }

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.ease
      }
    ).start()
  }

  hideModal() {
    this.setState({ addWorkoutVisible: false });
  }

  renderPopup() {
    const marginTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-1300, 0]
    })
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    })
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })
    const rotateX = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    })
    if (this.state.addWorkoutVisible) {
      this.animate()
      return (
        <View style={styles.popupContainer}>
          <Animated.View
            style={{
              marginTop,
              height: 1,
              width: 1}}>
          </Animated.View>
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
            <CustomCalendarStrip />
          </View>
          <View
            style={
              (globalStyles.columnContentContainer,
              globalStyles.contentContainer)
            }
          >
            <LatestWorkout navigation={this.props.navigation} />
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
    backgroundColor: '#7ad9c6',
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#b9baf1',
    marginBottom: 10
  },
  menuItemText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 15,
    marginRight: 15
  }
});
