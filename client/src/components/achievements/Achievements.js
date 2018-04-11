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

const beast = {
  gold: require('../../../assets/achievements/beast_gold.png'),
  silver: require('../../../assets/achievements/beast_silver.png'),
  bronze: require('../../../assets/achievements/beast_bronze.png')
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

const magnet = {
  gold: require('../../../assets/achievements/magnet_gold.png'),
  silver: require('../../../assets/achievements/magnet_silver.png'),
  bronze: require('../../../assets/achievements/magnet_bronze.png')
};

const owl = {
  gold: require('../../../assets/achievements/owl_gold.png'),
  silver: require('../../../assets/achievements/owl_silver.png'),
  bronze: require('../../../assets/achievements/owl_bronze.png')
};

const scholar = {
  gold: require('../../../assets/achievements/scholar_gold.png'),
  silver: require('../../../assets/achievements/scholar_silver.png'),
  bronze: require('../../../assets/achievements/scholar_bronze.png')
};

const spontaneous = {
  gold: require('../../../assets/achievements/spontaneous_gold.png'),
  silver: require('../../../assets/achievements/spontaneous_silver.png'),
  bronze: require('../../../assets/achievements/spontaneous_bronze.png')
};

const yeti = {
  gold: require('../../../assets/achievements/yeti_gold.png'),
  silver: require('../../../assets/achievements/yeti_silver.png'),
  bronze: require('../../../assets/achievements/yeti_bronze.png')
};

const images = {
  beast,
  cheetah,
  chicken,
  magnet,
  owl,
  scholar,
  spontaneous,
  yeti
};

class Achievements extends React.Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Image
        source={require('../../../assets/achievements.png')}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
    )
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
          <Text style={globalStyles.headerTitle}>Achievements</Text>
          <View style={globalStyles.headerFillerItem} />
        </Header>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              this.popupDialog.show();
            }}
          >
            <View style={globalStyles.achievementsContainer}>
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
