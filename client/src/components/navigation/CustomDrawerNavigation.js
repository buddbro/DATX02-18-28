import {
  DrawerItems,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-navigation';
import React from 'react';

export default class CustomDrawerNavigation extends React.Component {
  render() {
    console.log(this.props);
    return (
      <ScrollView>
        <SafeAreaView
          style={{ backgroundColor: '#CAF4EC' }}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
