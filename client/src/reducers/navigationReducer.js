import AppNavigator from '../containers/AppNavigator';

//Byt workout till en ny route om ni vill ha en annan startsida
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('CreateAccount')
  // AppNavigator.router.getActionForPathAndParams('Workout')
);

export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
