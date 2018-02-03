import { combineReducers } from 'redux';
import nav from './navigationReducer';
import workout from './workoutReducer';
import user from './userReducer';

export default combineReducers({
  nav,
  workout,
  user
});
