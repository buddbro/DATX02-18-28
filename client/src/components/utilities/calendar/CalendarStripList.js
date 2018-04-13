import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';
import CalendarStripItem from './CalendarStripItem';
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

const itemWidth = 10 + Dimensions.get('window').width / 7;

export default class CalendarStrip extends React.Component {
  constructor() {
    super();

    this.state = {
      loadedDays: [],
      firstVisibleDay: moment(),
      daysInRow: 7,
      scrollStart: 0,
      scrollEnd: 0,
      initiated: false
    };
  }

  componentDidMount() {
    const dates = this.getInitialDates();
    this.setState({
      loadedDays: dates
    });
    const middle = Dimensions.get('window').width * dates.length / 2;
  }

  getInitialDates() {
    const firstDay = moment().subtract(7, 'd');
    const days = [];
    for (i = 1; i < this.state.daysInRow * 2 + 1; i++) {
      days.push(moment(firstDay).add(i, 'days'));
    }

    this.setState({
      loadedDays: [...days]
    });
    return days;
  }

  subtractDays(numOfDays) {
    const days = this.state.loadedDays;
    for (i = 1; i <= numOfDays; i++) {
      days.unshift(moment(this.state.loadedDays[0]).subtract(i, 'days'));
    }
  }

  addDays(numOfDays) {
    const days = this.state.loadedDays;
    for (i = 1; i <= numOfDays; i++) {
      days.push(moment(this.state.loadedDays[0]).add(i, 'days'));
    }
  }

  onScroll(event) {
    if (this.state.scrollStart > this.state.scrollEnd) {
      this.subtractDays(
        Math.round(
          Math.abs(
            (this.state.scrollEnd - this.state.scrollStart) /
              (Dimensions.get('window').width / 7)
          )
        )
      );
    } else if (this.state.scrollStart < this.state.scrollEnd) {
      this.addDays(
        Math.round(
          Math.abs(
            (this.state.scrollEnd - this.state.scrollStart) /
              (Dimensions.get('window').width / 7)
          )
        )
      );
    }
  }

  onViewableItemsChanged({ viewAbleItems, changed }) {
    console.log('yolo', viewAbleItems, changed);
  }

  renderCalendar() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <FlatList
          ref={calendar => (this._calendar = calendar)}
          horizontal
          scrollEventThrottle={500}
          initialScrollIndex={3}
          onScroll={this.onScroll()}
          getItemLayout={(data, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index
          })}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={event => {
            console.log('wheres my x bitch', event.nativeEvent.contentOffset.x);

            this.setState({
              scrollStart: event.nativeEvent.contentOffset.x
            });
          }}
          onMomentumScrollEnd={event => {
            console.log('theres my x bitch', event.nativeEvent.contentOffset.x);
            console.log(
              'start reached = ' + Number(event.nativeEvent.contentOffset.x) ===
                0
            );

            this.setState({
              scrollEnd: event.nativeEvent.contentOffset.x
            });
          }}
          decelerationRate={'fast'}
          data={this.state.loadedDays}
          scrollRenderAheadDistance={Dimensions.get('window').width / 7}
          keyExtractor={(item, index) => item.valueOf() * index}
          renderItem={({ item, index }) => {
            const highlight = index === this.state.currentIndex;
            return (
              <CalendarStripItem
                style={styles.stripItem}
                highlighted={highlight}
                dateNumber={item.format('DD')}
                dateText={weekdays[item.day()]}
              />
            );
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.calendarTitle}>
          {this.state.loadedDays && this.state.loadedDays[4]
            ? `${
                months[this.state.loadedDays[4].format('M')]
              }, ${this.state.loadedDays[4].format('YYYY')}`
            : ''}
        </Text>
        {this.renderCalendar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
