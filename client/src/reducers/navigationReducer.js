import AppNavigator from '../containers/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('CreateAccount')
);

export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
