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

import { fetchAchievements } from '../../actions';

const images = {
  time: require('../../../assets/achievements/time.png'),
  owl: require('../../../assets/achievements/owl.png')
};

class Achievements extends React.Component {
  static navigationOptions = {
    drawerIcon: () =>
      <Image
        source={require('../../../assets/achievements.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
  };

  componentDidMount() {
    this.props.fetchAchievements();
  }

  renderAchivements() {
    return this.props.achievements.map(achievement => {
      return (
        <AchievementCell
          key={achievement.id}
          image={images[achievement.image]}
          title={achievement.name}
          date={achievement.obtained_date}
          obtained={achievement.obtained_times}
        />
      );
    });
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
            {this.renderAchivements()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    achievements: user.achievements
  };
};

export default connect(mapStateToProps, {
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
