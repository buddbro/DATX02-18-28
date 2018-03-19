import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class AchievementCell extends React.PureComponent {
  render() {
    return (
      <View style={styles.achievementItem}>
        <Image
          style={styles.achievementItemContent}
          source={this.props.image}
        />
        <Text style={styles.achievementItemContent}>Achievements</Text>
      </View>
    );
  }
}

export default AchievementCell;

const styles = StyleSheet.create({
  achievementItem: {
    backgroundColor: '#f82',
    width: '50%',
    justifyContent: 'center'
  },
  achievementItemContent: {
    alignSelf: 'center'
  }
});
