import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class AchievementCell extends React.PureComponent {
  render() {
    return (
      <View style={styles.achievementItem}>
        <Image style={styles.achievementItemImage} source={this.props.image} />
        <Text style={styles.achievementItemContent}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default AchievementCell;

const styles = StyleSheet.create({
  achievementItem: {
    backgroundColor: '#fde',
    width: '50%',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 35
  },
  achievementItemImage: {
    alignSelf: 'center',
    width: 50,
    height: 50
  },
  achievementItemContent: {
    alignSelf: 'center'
  }
});
