import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  Image
} from 'react-native';
import NavigationActions from 'react-navigation';
import { logout } from '../../actions';
import { Svg } from 'expo';

import avatar from '../../../assets/avatar_default.svg';
import profile_bottom from '../../../assets/profile_bottom.svg';

const { height, width } = Dimensions.get('window');

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy < 180) {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > 100) {
          this.forceSwipe();
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position };
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe() {
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: 180 },
      duration: 250
    }).start();
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getProfileStyle() {
    return {
      top: this.state.position.getLayout().top
    };
  }

  render() {
    return (
      <Animated.View
        style={[this.getProfileStyle(), { zIndex: 10 }]}
        {...this.state.panResponder.panHandlers}
      >
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#7ad9c6',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: 10,
              marginLeft: 70,
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#7ad9c6'
              }}
            >
              <Text style={styles.userWelcome}>
                Welcome back {this.props.user.name}!
              </Text>
              <Text style={styles.tagline}>Ready to rock?</Text>
            </View>
            <View
              style={{
                backgroundColor: '#7ad9c6'
              }}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Image
                source={require('../../../assets/menu.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          {/* <Svg height="50" width={width}>
            <Svg.Ellipse
              cx={width / 2}
              cy="5"
              rx={width / 1.5}
              ry="30"
              stroke="#7ad9c6"
              strokeWidth="0"
              fill="#7ad9c6"
            /> */}

          {/* <Image
              source={require('../../../assets/down-arrow.png')}
              style={{
                marginTop: 5,
                width: 22,
                height: 22,
                alignSelf: 'center'
              }}
            /> */}
          {/* </Svg> */}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7ad9c6',
    paddingTop: 10,
    paddingBottom: 10
  },
  userWelcome: {
    paddingTop: 0,
    marginTop: 5,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  tagline: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
});

export default connect(null, { logout })(ProfileHeader);
