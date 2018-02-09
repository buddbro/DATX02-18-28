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

// import log_off from '../../../assets/icons/action/drawable-hdpi/ic_exit_to_app_white_48dp.png';
// import drag_down from '../../../assets/icons/navigation/drawable-hdpi/ic_arrow_drop_down_white_36dp.png';
// import avatar from '../../../assets/avatar_default.svg';
// import profile_bottom from '../../../assets/profile_bottom.svg';

const { height, width } = Dimensions.get('window');

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture);
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
      // <Animated.View
      //   style={[this.getProfileStyle(), { zIndex: 10 }]}
      //   {...this.state.panResponder.panHandlers}
      // >
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
            <Image
              source={require('../../../assets/ic_exit_to_app_white_48dp.png')}
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <Image
              source={require('../../../assets/avatar_default.png')}
              style={{ width: 45, height: 45, alignSelf: 'center' }}
            /> */}
          <Text style={styles.userWelcome}>
            Welcome back {this.props.user.name}!
          </Text>
        </View>
        <Text style={styles.tagline}>Ready to rock?</Text>
        <Svg height="100" width={width}>
          <Svg.Ellipse
            cx={width / 2}
            cy="5"
            rx={width / 1.5}
            ry="30"
            stroke="#b9baf1"
            strokeWidth="0"
            fill="#b9baf1"
          />
          {/* <Image
            source={require('../../../assets/icons/ic_arrow_drop_down_white_36dp.png')}
            style={{ width: 40, height: 40, alignSelf: 'center' }}
          /> */}
        </Svg>
      </View>
      // </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b9baf1',
    height: 200,
    paddingTop: 80
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
