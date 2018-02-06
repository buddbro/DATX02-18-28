import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import NavigationActions from 'react-navigation';
import { logout } from '../../actions';
import { Svg } from 'expo';
const { Ellipse } = Svg;

import avatar from '../../../assets/avatar_default.svg';
import profile_bottom from '../../../assets/profile_bottom.svg';

const { height, width } = Dimensions.get('window');

class ProfileHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginRight: 10
            }}
            onPress={() => {
              this.props.logout(this.props.user.id);
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'LoginUser'
                })
              );
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#fff'
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Image
            source={require('../../../assets/avatar_default.png')}
            style={{ width: 45, height: 45, alignSelf: 'center' }}
          />
          {/* <Image
            source={avatar}
            style={{ width: 45, height: 45, alignSelf: 'center' }}
          /> */}
          <Text style={styles.userWelcome}>
            Welcome back {this.props.user.name}!
          </Text>
        </View>
        <Text style={styles.tagline}>Ready to rock!?</Text>
        <Svg height="100" width={width}>
          <Ellipse
            cx={width / 2}
            cy="5"
            rx={width / 1.5}
            ry="30"
            stroke="#b9baf1"
            strokeWidth="0"
            fill="#b9baf1"
          />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    backgroundColor: '#b9baf1',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'column',
    top: 170 - height,
    height: 230,
    paddingTop: 85
  },
  userWelcome: {
    marginTop: 20,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
});

export default connect(null, { logout })(ProfileHeader);
