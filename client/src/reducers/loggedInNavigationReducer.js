import AppNavigator from '../containers/AppNavigator';

// Byt workout till en ny route om ni vill ha en annan startsida
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Settings')
);

export default (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
