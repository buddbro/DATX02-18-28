import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  Dimensions
} from 'react-native';
import CalendarStripItem from './CalendarStripItem';

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
  constructor(props) {
    super(props);

    this.state = {
      currentOffset: 59,
      currentIndex: 4,
      dates: [],
      weeksBeforeToday: 1,
      weeksAfterToday: 1,
      loadingDatesBefore: false,
      loadingDatesAfter: false
    };
  }

  componentDidMount() {
    this.setState({
      dates: this.getInitialDates()
      // currentIndex: this.state.weeksBeforeToday * 7
    });
  }

  loadMoreDatesBefore() {
    if (this.state.loadingDatesBefore) {
      return;
    }

    this.setState({ loadingDatesBefore: true });

    const dates = [];
    const currentDay = new Date();
    currentDay.setDate(
      currentDay.getDate() - this.state.weeksBeforeToday * 7 + 4
    );

    for (i = 0; i < 7; i++) {
      dates[i] = new Date();
      dates[i].setDate(currentDay.getDate() + i);
    }

    this.setState({
      dates: [...dates, ...this.state.dates],
      weeksBeforeToday: this.state.weeksBeforeToday + 1
    });

    setTimeout(
      () =>
        this.setState({
          loadingDatesBefore: false
        }),
      2000
    );

    this.flatList.scrollToIndex({ animated: false, index: 7, viewOffset: 0 });
  }

  loadMoreDatesAfter(info) {
    if (this.state.loadingDatesAfter) {
      return;
    }

    this.setState({ loadingDatesAfter: true });

    const dates = [];
    const currentDay = new Date();
    currentDay.setDate(
      currentDay.getDate() + this.state.weeksAfterToday * 7 + 3
    );

    for (i = 0; i < 7; i++) {
      dates[i] = new Date();
      dates[i].setDate(currentDay.getDate() + i);
    }

    this.setState({
      dates: [...this.state.dates, ...dates],
      weeksAfterToday: this.state.weeksAfterToday + 1
    });

    setTimeout(
      () =>
        this.setState({
          loadingDatesAfter: false
        }),
      2000
    );
  }

  getInitialDates() {
    const dates = [];
    const currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 5);

    for (
      i = 0;
      i < 7 * (this.state.weeksBeforeToday + this.state.weeksAfterToday);
      i++
    ) {
      dates[i] = new Date();
      dates[i].setDate(currentDay.getDate() + 1);
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return dates;
  }

  getAWeek() {
    const weektmp = [];
    const currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - this.state.weeksBeforeToday * 7);

    for (
      i = 0;
      i < 7 * (this.state.weeksBeforeToday + this.state.weeksAfterToday);
      i++
    ) {
      weektmp[i] = new Date();
      weektmp[i].setDate(currentDay.getDate() + 1);
      currentDay.setDate(currentDay.getDate() + 1);
    }

    // for (i = 0; i < 9; i++) {
    //   weektmp[i] = new Date();
    // }
    //
    // for (i = 3; i > -1; i--) {
    //   weektmp[i].setDate(weektmp[i + 1].getDate() - 1);
    // }
    // for (i = 5; i < 9; i++) {
    //   weektmp[i].setDate(weektmp[i - 1].getDate() + 1);
    // }
    return weektmp;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.calendarTitle}>
          {/* {this.transformMonthText(this.getAWeek()[4])} */}
          {this.state.dates && this.state.dates[4]
            ? `${months[
                this.state.dates[4].getMonth()
              ]}, ${this.state.dates[4].getFullYear()}`
            : ''}
        </Text>

        <FlatList
          ref={ref => {
            this.flatList = ref;
          }}
          onEndReached={this.loadMoreDatesAfter.bind(this)}
          onScroll={event => {
            if (event.nativeEvent.contentOffset.x <= 0) {
              this.loadMoreDatesBefore();
            }
            if (
              event.nativeEvent.contentOffset.x - this.state.currentOffset >
              30
            ) {
              this.setState({ currentOffset: this.state.currentOffset + 53 });
              this.setState({ currentIndex: this.state.currentIndex + 1 });
            } else if (
              event.nativeEvent.contentOffset.x - this.state.currentOffset <
              -30
            ) {
              this.setState({ currentOffset: this.state.currentOffset - 53 });
              this.setState({ currentIndex: this.state.currentIndex - 1 });
            }
          }}
          scrollEventThrottle={20}
          horizontal={true}
          data={this.state.dates}
          contentContainerStyle={styles.flatList}
          keyExtractor={item => item.getTime()}
          initialScrollIndex={1}
          snapToInterval={Dimensions.get('window').width / 7}
          getItemLayout={(data, index) => ({
            length: Dimensions.get('window').width / 7,
            offset: Dimensions.get('window').width / 7 * index,
            index
          })}
          renderItem={({ item, index }) => {
            const highlight = index === this.state.currentIndex;
            return (
              <CalendarStripItem
                style={styles.stripItem}
                highlighted={highlight}
                dateNumber={item.getDate()}
                dateText={weekdays[item.getDay()]}
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
