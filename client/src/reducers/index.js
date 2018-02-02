import { combineReducers } from 'redux';
import nav from './navigationReducer';
import loginNav from './loginNavigationReducer';
import workoutReducer from './workoutReducer';

export default combineReducers({
  nav,
  loginNav,
  workoutReducer
});
