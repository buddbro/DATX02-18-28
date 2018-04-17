import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

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

class AchievementCell extends React.PureComponent {
  render() {
    const {
      name,
      image,
      obtained_date,
      obtained_times
    } = this.props.achievement;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.achievement.name}</Text>
        {/*<Text>{this.props.achievements[3].name}</Text>*/}
        <View style={styles.bronzeSilverContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.showAchievement(this.props.achievement);
            }}
          >
            <Image
              style={styles.bronzeSilverImage}
              source={images[this.props.achievement.image]['bronze']}
            />
            {/*<Image
              style={styles.bronzeSilverImage}
              source={beast.gold}
            />*/}
          </TouchableOpacity>

          <View style={styles.paddingView}/>

          <TouchableOpacity
            onPress={() => {
              this.props.showAchievement(this.props.achievement);
            }}
          >
            <Image
              style={styles.bronzeSilverImage}
              source={images[this.props.achievement.image]['silver']}
            />
          </TouchableOpacity>

        </View>
        <View style={styles.goldContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.showAchievement(this.props.achievement);
            }}
          >
            <Image
              style={styles.goldImage}
              source={images[this.props.achievement.image]['gold']}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AchievementCell;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    borderBottomColor: '#505050',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    color: '#505050',
    fontSize: 30,
    paddingBottom: 5,
    fontWeight: '200',
  },
  bronzeSilverContainer: {
    flexDirection: 'row'
  },
  goldContainer: {
    alignItems: 'center'
  },
  bronzeSilverImage: {
    width: 110,
    height: 110
  },
  goldImage: {
    width: 150,
    height: 150
  },
  paddingView: {
    width: 20
  }
});
