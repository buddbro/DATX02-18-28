import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import NavigationActions from 'react-navigation';

import AchievementCell from './AchievementCell';

import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

class Achievements extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header>
          <BackArrow
            callback={() =>
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              )}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.info}>Info</Text>
          </TouchableOpacity>
        </Header>
        <View style={styles.achievementsContainer}>
          <AchievementCell
            image={require('../../../assets/achievements/time.png')}
          />
        </View>
      </View>
    );
  }
}

export default Achievements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  info: {
    fontSize: 20,
    color: '#000'
  },
  achievementsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row'
  }
});
