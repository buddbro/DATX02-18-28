import { combineReducers } from 'redux';
import nav from './navigationReducer';
import loggedInNavigation from './loggedInNavigationReducer';
import workout from './workoutReducer';
import user from './userReducer';

export default combineReducers({
  nav,
  loggedInNavigation,
  workout,
  user
});
