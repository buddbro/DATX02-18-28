import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import NavigationActions from 'react-navigation';

class Achievements extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow_black.png')}
              style={styles.back}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.info}>Info</Text>
          </TouchableOpacity>
        </View>
        <Text>Achievements</Text>
      </View>
    );
  }
}

export default Achievements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 50
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  },
  back: {
    width: 35,
    height: 35
  },
  info: {
    fontSize: 20,
    color: '#000'
  }
});
