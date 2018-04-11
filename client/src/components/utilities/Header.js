import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import globalStyles from '../../styles/global-styles';
import BackArrow from '../utilities/BackArrow';

const fillIfNoChild = children => {
  if (!children) {
    return <View style={globalStyles.headerFillerItem} />;
  }

  return children;
};

const renderWithoutMenu = ({ noMenu, navigation }) => {
  if (!noMenu) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Image
          source={require('../../../assets/menu.png')}
          style={globalStyles.iconSmall}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <BackArrow
        color="white"
        callback={() => {
          this.saveWorkout();
          this.setState({
            initiated: false,
            title: '',
            start: '',
            stop: ''
          });
          this.props.fetchWorkouts();
          navigation.dispatch(
            NavigationActions.NavigationActions.navigate({
              routeName: 'Dashboard'
            })
          );
        }}
      />
    );
  }
};

export default (Header = ({ children }) => (
  <View style={[globalStyles.header]}>{children}</View>
));
