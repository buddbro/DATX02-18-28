import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

class AchievementCell extends React.PureComponent {
  render() {
    return (
        <View style={styles.achievementItem}>
          <TouchableOpacity onPress={() => {this.popupDialog.show();}}>
            <Image style={styles.achievementItemImage} source={this.props.image} />
          </TouchableOpacity>
          <PopupDialog
            ref={(popupDialog) => {this.popupDialog = popupDialog; }}
            dismissOnHardwareBackPress={true}
            width={0.9}
            height={0.9}
          >
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
          </PopupDialog>
        </View>
    );
  }
}

export default AchievementCell;

const styles = StyleSheet.create({
  achievementItem: {
    width: '50%',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  achievementItemImage: {
    width: 120,
    height: 120
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
