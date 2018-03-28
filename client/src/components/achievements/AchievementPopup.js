import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

class AchievementPopup extends React.PureComponent {
  render() {
    return (
      <View style={styles.achievementDetails}>
        <Text style={styles.header}>
          {this.props.title}
        </Text>
        <Text style={styles.date}>
          {this.props.date}
        </Text>
        <Text style={styles.date}>
          Obtained: {this.props.obtained} times
        </Text>
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
    backgroundColor: '#b9baf1',
    justifyContent: 'center',
  },
  header: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000'
  },
  date: {
    color: '#000'
  }
});
