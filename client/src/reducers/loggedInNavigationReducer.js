import AppNavigator from '../containers/AppNavigator';

// Byt workout till en ny route om ni vill ha en annan startsida
const INITIAL_STATE = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Workout')
);

export default (state = INITIAL_STATE, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  console.log('nextState');
  console.log(nextState);
  return nextState || state;
};
