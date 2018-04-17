import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

class AchievementCell extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bronzeSilverContainer}>

          <TouchableOpacity
            onPress={() => {
              this.props.showAchievement(this.props.achievement);
            }}
          >
            <Image
              style={styles.bronzeSilverImage}
              source={this.props.image}
            />
          </TouchableOpacity>

          <View style={styles.paddingView}/>

          <TouchableOpacity
            onPress={() => {
              this.props.showAchievement(this.props.achievement);
            }}
          >
            <Image
              style={styles.bronzeSilverImage}
              source={this.props.image}
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
              source={this.props.image}
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
