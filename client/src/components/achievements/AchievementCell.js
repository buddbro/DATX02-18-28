import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class AchievementCell extends React.PureComponent {
  render() {
    return (
      <View style={styles.achievementItem}>
        <Image style={styles.achievementItemImage} source={this.props.image} />
        <Text style={styles.header}>
          {this.props.title}
        </Text>
        <Text style={styles.date}>
          {this.props.date}
        </Text>
      </View>
    );
  }
}

export default AchievementCell;

const styles = StyleSheet.create({
  achievementItem: {
    backgroundColor: '#ffdfef',
    width: '50%',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 35,
    alignItems: 'center'
  },
  achievementItemImage: {
    width: 50,
    height: 50
  },
  header: { fontWeight: '600' },
  date: {}
});
