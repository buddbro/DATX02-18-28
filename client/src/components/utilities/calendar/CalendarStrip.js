import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  Dimensions,
  Platform
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

export default class CalendarStrip extends React.Component {
  constructor() {
    super();

    this.state = {
      ds: { rowHasChanged: (r1, r2) => r1 !== r2 },
      loadedDays: [],
      firstVisibleDay: moment(),
      daysInRow: 7
    };
  }

  componentDidMount() {
    const ds = this.getInitialDates();
    this.setState({
      ds: [...this.state.ds, ds]
    });

    Platform.OS === 'ios'
      ? this._calendar.scrollToOffset({
          x: Dimensions.get('window').width * 2,
          y: 0,
          animated: false
        })
      : setTimeout(() => {
          this._calendar.scrollToOffset({
            x: Dimensions.get('window').width * 2,
            y: 0,
            animated: false
          });
        }, 200);
  }

  getInitialDates() {
    const firstDay = moment().subtract(
      Math.round(this.state.daysInRow * 2 + this.state.daysInRow / 2),
      'd'
    );
    const days = [];
    for (i = 1; i < this.state.daysInRow * 5; i++) {
      days.push(moment(firstDay).add(i, 'days'));
    }

    this.setState({
      loadedDays: [...days]
    });
    return days;
  }

  loadNextWeek(nextDay) {
    const days = [];
    for (i = 1; i <= this.state.daysInRow; i++) {
      days.push(nextDay.clone().add(i, 'days'));
    }
    this.setState({
      ds: [this.state.ds, ...this.state.loadedDays, ...days],
      loadedDays: [...this.state.loadedDays, ...days]
    });
  }

  loadPreviousWeek(nextDay) {
    const days = [];
    for (i = this.state.daysInRow; i >= 1; i--) {
      days.push(nextDay.clone().subtract(i, 'days'));
    }

    this.setState(
      () => {
        const ds = this.state.ds;

        return {
          ds: [...this.state.ds, ds],
          loadedDays: [...days, ...this.state.loadedDays]
        };
      },
      () => {
        this._calendar.scrollToOffset({
          x: Dimensions.get('window').width * 2,
          y: 0,
          animated: false
        });
      }
    );
  }

  scrollEnded(event) {
    if (event.nativeEvent.contentOffset.x <= Dimensions.get('window').width) {
      this.loadPreviousWeek(this.state.loadedDays[0]);
    }
  }

  onEndReached() {
    const lastDayInList = this.state.loadedDays[
      this.state.loadedDays.length - 1
    ];
    this.loadNextWeek(lastDayInList);
  }

  onChangeVisibleRows(event) {
    const firstVisibleRowId = Number(Object.keys(event.s1)[0]) + 1;
    this.setState({
      firstVisibleDay: this.state.loadedDays[firstVisibleRowId].day
    });
  }

  render() {
    if (!this.state.loadedDays) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.calendarTitle}>
          {/* {this.transformMonthText(this.getAWeek()[4])} */}
          {this.state.dates && this.state.dates[4]
            ? `${
                months[this.state.dates[4].getMonth()]
              }, ${this.state.dates[4].getFullYear()}`
            : ''}
        </Text>

        <FlatList
          ref={calendar => (this._calendar = calendar)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets
          onMomentumScrollEnd={event => this.scrollEnded(event)}
          scrollEventThrottle={500}
          onChangeVisibleRows={event => {
            this.onChangeVisibleRows(event);
          }}
          onEndReached={() => {
            this.onEndReached();
          }}
          onEndReachedThreshold={Dimensions.get('window').width}
          data={this.state.loadedDays}
          keyExtractor={item => item.valueOf()}
          renderItem={({ item, index }) => {
            const highlight = index === this.state.currentIndex;
            return (
              <CalendarStripItem
                style={styles.stripItem}
                highlighted={highlight}
                dateNumber={item.format('DD')}
                dateText={weekdays[item.day()] }
              />
            );
          }}
        />
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
