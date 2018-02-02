import { NAV_TO_CREATE } from '../actions/types';

import LoginNavigatorNavigator from '../containers/LoginNavigator';

const initialState = LoginNavigator.router.getStateForAction(
  LoginNavigator.router.getActionForPathAndParams('LoginUser')
);

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case NAV_TO_CREATE:
      NavigationActions.navigate({ routeName: 'CreateAccount' });
    default:
      nextState = LoginNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
};
