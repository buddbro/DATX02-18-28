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
import AchievementPopup from './AchievementPopup';
import PopupDialog from 'react-native-popup-dialog';
import Header from '../utilities/Header';

import { fetchAchievements } from '../../actions';

const owl = {
  gold: require('../../../assets/achievements/owl_gold.png'),
  silver: require('../../../assets/achievements/owl_silver.png'),
  bronze: require('../../../assets/achievements/owl_bronze.png')
};

const time = {
  gold: require('../../../assets/achievements/time.png'),
  silver: require('../../../assets/achievements/time.png'),
  bronze: require('../../../assets/achievements/time.png')
};

const cheetah = {
  gold: require('../../../assets/achievements/cheetah_gold.png'),
  silver: require('../../../assets/achievements/cheetah_silver.png'),
  bronze: require('../../../assets/achievements/cheetah_bronze.png')
};

const chicken = {
  gold: require('../../../assets/achievements/chicken_gold.png'),
  silver: require('../../../assets/achievements/chicken_silver.png'),
  bronze: require('../../../assets/achievements/chicken_bronze.png')
};

const images = { owl, time, cheetah, chicken };

class Achievements extends React.Component {
  static navigationOptions = {
    drawerIcon: () =>
      <Image
        source={require('../../../assets/achievements.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
  };

  constructor(props) {
    super(props);

    this.state = { active: {} };
  }

  componentDidMount() {
    this.props.fetchAchievements();
  }

  showAchievement(achievement) {
    this.setState({ active: achievement });
    this.popupDialog.show();
  }

  renderAchievements() {
    return this.props.achievements.map(achievement => {
      return (
        <AchievementCell
          achievement={achievement}
          showAchievement={this.showAchievement.bind(this)}
          image={images[achievement.image][achievement.level]}
          key={achievement.id}
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
          <TouchableOpacity
            onPress={() => {
              this.popupDialog.show();
            }}
          >
            <View style={styles.achievementsContainer}>
              {this.renderAchievements()}
            </View>
          </TouchableOpacity>
        </ScrollView>
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dismissOnHardwareBackPress={true}
          width={0.8}
          height={0.7}
          overlayOpacity={0.8}
          // dialogStyle={{ backgroundColor: '#000', opacity: 0.4 }}
        >
          <AchievementPopup
            achievement={this.state.active}
            level={this.state.active.level}
          />
        </PopupDialog>
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
