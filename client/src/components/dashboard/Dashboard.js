import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

import ProfileHeader from './ProfileHeader';
import Workout from '../workout/Workout';

class Dashboard extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ProfileHeader
          user={this.props.user}
          navigation={this.props.navigation}
        />
        <Workout navigation={this.props.navigation} />
        <View style={{ marginTop: 120 }}>
          <Text>Hej</Text>
          <TouchableOpacity onPress={() => console.log('tihi')}>
            <View />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50
  }
});
