import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
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

const { height, width } = Dimensions.get('window');

class AchievementPopup extends React.Component {
  render() {
    const {
      name,
      image,
      obtained_date,
      obtained_times
    } = this.props.achievement;

    if (!name) {
      return <View />;
    }

    return (
      <View style={styles.achievementDetails}>
        <Text style={styles.header}>{name}</Text>
        <Image style={styles.image} source={images[image][this.props.level]} />
        <Text style={styles.date}>
          {obtained_date ? obtained_date.substring(0, 10) : ''}
        </Text>
        <Text style={styles.date}>Obtained: {obtained_times} times</Text>
      </View>
    );
  }
}

export default AchievementPopup;

const styles = StyleSheet.create({
  achievementItem: {
    width: '50%',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  achievementDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 34,
    fontWeight: '200'
  },
  date: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20
  },
  image: { width: width * 0.64, height: 240 }
});
