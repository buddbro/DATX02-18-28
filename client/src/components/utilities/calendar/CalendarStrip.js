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

export default class CalendarStrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOffset: 59,
      currentIndex: 4
    };
  }

  getAWeek() {
    var weektmp = [];
    for (i = 0; i < 9; i++) {
      weektmp[i] = new Date();
    }

    for (i = 3; i > -1; i--) {
      weektmp[i].setDate(weektmp[i + 1].getDate() - 1);
    }
    for (i = 5; i < 9; i++) {
      weektmp[i].setDate(weektmp[i - 1].getDate() + 1);
    }
    return weektmp;
  }

  transformMonthText(date) {
    newDate = date.getMonth();
    month = '';
    switch (newDate) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }
    return month + ', ' + date.getFullYear();
  }

  transformDateText(date) {
    newDate = date.getDay();
    day = '';
    switch (newDate) {
      case 0:
        day = 'Sun';
        break;
      case 1:
        day = 'Mon';
        break;
      case 2:
        day = 'Tue';
        break;
      case 3:
        day = 'Wed';
        break;
      case 4:
        day = 'Thu';
        break;
      case 5:
        day = 'Fri';
        break;
      case 6:
        day = 'Sat';
        break;
    }
    return day;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.calendarTitle}>
          {this.transformMonthText(this.getAWeek()[4])}
        </Text>

        <FlatList
          onScroll={event => {
            if (
              event.nativeEvent.contentOffset.x - this.state.currentOffset >
              30
            ) {
              this.setState({ currentOffset: this.state.currentOffset + 59 });
              this.setState({ currentIndex: this.state.currentIndex + 1 });
            } else if (
              event.nativeEvent.contentOffset.x - this.state.currentOffset <
              -30
            ) {
              this.setState({ currentOffset: this.state.currentOffset - 59 });
              this.setState({ currentIndex: this.state.currentIndex - 1 });
            }
          }}
          scrollEventThrottle={20}
          horizontal={true}
          data={this.getAWeek()}
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
                dateText={this.transformDateText(item)}
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
