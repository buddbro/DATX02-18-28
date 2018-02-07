import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';
import { Provider, connect } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators
} from 'redux';
import thunk from 'redux-thunk';
import { loginWithToken, fetchExerciseList } from './src/actions';
import reducers from './src/reducers';

import AppNavigator from './src/containers/AppNavigator';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loginWithToken());
    store.dispatch(fetchExerciseList());
  }

  render() {
    return this.props.user.token
      ? <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.loggedInNavigation
          })}
        />
      : <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        />;
  }
}

const mapStateToProps = ({ nav, user, loggedInNavigation }) => ({
  user,
  nav,
  loggedInNavigation
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
