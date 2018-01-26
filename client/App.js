import React from 'react';
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import reducers from './src/reducers';

import AppNavigator from './src/containers/AppNavigator';

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(reducers);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
