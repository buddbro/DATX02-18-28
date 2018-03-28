import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

class AchievementCell extends React.PureComponent {
  render() {
    console.log(this.props.achievement);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.showAchievement(this.props.achievement);
          }}
        >
          <View style={styles.cellContainer}>
            <Image
              style={styles.achievementItemImage}
              source={this.props.image}
            />
          </View>
        </TouchableOpacity>
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
  cellContainer: {}
});
