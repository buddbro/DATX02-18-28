// import { NAV_TO_CREATE } from '../actions/types';

import LoginNavigatorNavigator from '../containers/LoginNavigator';

const initialState = LoginNavigator.router.getStateForAction(
  LoginNavigator.router.getActionForPathAndParams('CreateAccount')
);

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    default:
      nextState = LoginNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
};
