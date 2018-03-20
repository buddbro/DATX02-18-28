import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';
import AchievementCell from './AchievementCell';

import Header from '../utilities/Header';
import BackArrow from '../utilities/BackArrow';

import {
  fetchAchievements
} from '../../actions';

class Achievements extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/achievements.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
    )
  };

  componentDidMount(){
    this.props.fetchAchievements
  }

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor="#b9baf1">
          <View />
          <Text style={styles.headerTitle}>Achievements</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Header>
        <ScrollView>
          <View style={styles.achievementsContainer}>
            <AchievementCell
              image={require('../../../assets/achievements/time.png')}
              title="Badge"
              date="Datum"
            />
            <AchievementCell
              image={require('../../../assets/achievements/nightowl.png')}
              title="Night Owl"
              date="19th March 2018"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {
  fetchAchievements
})(Achievements);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  headerTitle: {
    fontSize: 32,
    color: 'white'
  },
  info: {
    fontSize: 20,
    color: '#000'
  },
  achievementsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
