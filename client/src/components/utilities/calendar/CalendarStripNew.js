import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import CalendarStripItem from './CalendarStripItem';
import CalendarItemHighlight from './CalendarItemHighlight';

import { connect } from 'react-redux';
import { getSelectedDate } from '../../../actions';

import moment from 'moment';

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

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class CalendarStripNew extends React.Component {
  constructor(props) {
    super(props);
    this.opacityValue = new Animated.Value(0);

    this.state = {
      currentOffset: 0,
      currentIndex: 5,
      dates: [],
      loading: false,
      offset: 0,
      selectedDate: moment()
    };
  }

  componentDidMount() {
    this.setState({
      dates: this.getInitialDates()
      // currentIndex: this.state.weeksBeforeToday * 7
    });
  }

  getInitialDates() {
    const dates = [];
    var currentDay = moment();
    currentDay.subtract(5, 'days');

    for (i = 0; i < 9; i++) {
      dates[i] = moment(currentDay);
      dates[i].add(i, 'days');
    }

    this.props.getSelectedDate(dates[3]);

    return dates;
  }

  decrementDates() {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    const tempDates = this.state.dates;
    var tmp = moment(tempDates[0]).subtract(1, 'days');

    tempDates.unshift(tmp);
    tempDates.pop();
    //tempDates.pop();
    this.setState({ dates: tempDates });

    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      100
    );
    this._calendar.scrollTo({
      x: Dimensions.get('window') * 2 / 7,
      animated: false
    });
  }

  incrementDates() {
    if (this.state.loading) {
      return;
    }

    this.setState({ loading: true });

    const tempDates = this.state.dates;
    var tmp = moment(tempDates[8]).add(1, 'days');
    tempDates.push(tmp);
    tempDates.shift();
    this.setState({ dates: tempDates });

    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      100
    );
    this._calendar.scrollTo({
      x: Dimensions.get('window') * 2 / 7,
      animated: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.calendarTitle}>
          {this.state.dates && this.state.dates[4]
            ? `${this.state.dates[4].format('MMMM[,] YYYY')}`
            : ''}
        </Text>

        <ScrollView
          ref={calendar => (this._calendar = calendar)}
          horizontal={true}
          pagingEnabled
          scrollEventThrottle={300}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={Dimensions.get('window') / 7}
          snapToAlignment={'center'}
          bounces={true}
          onScroll={event => {
            this.setState({ currentOffset: event.nativeEvent.contentOffset.x });
            this.setState({
              offset: Math.abs(event.nativeEvent.contentOffset.x)
            });

            if (event.nativeEvent.contentOffset.x >= 3) {
              this.incrementDates();
              this.setState({ selectedDate: this.state.dates[4] });
              this.props.getSelectedDate(this.state.selectedDate);
            } else if (event.nativeEvent.contentOffset.x < 0 - 10) {
              this.decrementDates();
              this.setState({ selectedDate: this.state.dates[4] });
              this.props.getSelectedDate(this.state.selectedDate);
            }
          }}
        >
          <CalendarItemHighlight offset={this.state.offset} />

          {this.state.dates.map((item, index) => {
            const fade = item.month() !== this.state.dates[4].month();
            if (!item) {
              return null;
            }
            return (
              <CalendarStripItem
                style={styles.stripItem}
                faded={fade}
                dateNumber={item.format('DD')}
                dateText={weekdays[item.day()]}
                key={item.format('x')}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, { getSelectedDate })(CalendarStripNew);

const styles = StyleSheet.create({
  stripItem: {
    zIndex: 100
  },
  flatList: {
    paddingBottom: 10
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#B1EBE0',
    paddingTop: 10
  },
  calendarTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight: '200'
  }
});
