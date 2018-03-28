import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

class AchievementCell extends React.PureComponent {
  render() {
    return (
      <View style={styles.cellContainer}>
        <Image
          style={styles.achievementItemImage}
          source={this.props.image}
        />
      </View>
    );
  }
}

export default AchievementCell;

const styles = StyleSheet.create({
  achievementItemImage: {
    width: 120,
    height: 120
  },
  cellContainer: {
  },
});
