import React from 'react';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import Main from './src/components/Main';
import LoginMain from './src/components/login/LoginMain';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const AppRouteConfigs = {
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    LoginMain: {
        screen: LoginMain,
        navigationOptions: {
            header: null
        }
    },
    //navigationOptions: {
     // header: null
  //},
}
const Navigation = StackNavigator(AppRouteConfigs);

const initialState = Navigation.router.
    getStateForAction(Navigation.router.
        getActionForPathAndParams('LoginMain'));

const navReducer = (state = initialState, action) => {
    const nextState = Navigation.router.
        getStateForAction(action, state);

        return nextState || state;
};

const appReducer = combineReducers({
    nav: navReducer,
});


class App extends React.Component {
  componentDidMount() {
    if(false) {
      store.dispatch(NavigationActions.navigate({ routeName: 'Main'}));
    }
  }

  render() {
    return (
        <Navigation navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
    );
  }
}


const mapStateToProps = (state) => ({
    nav: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
