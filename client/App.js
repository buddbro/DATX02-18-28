import React from 'react';
import { StackNavigator } from 'react-navigation';
import Main from './components/Main';
import Workout from './components/Workout';

const Navigation = StackNavigator({
  Main: { screen: Main },
  Workout: { screen: Workout }
});

export default class App extends React.Component {
  render() {
    return <Navigation />;
  }
}
