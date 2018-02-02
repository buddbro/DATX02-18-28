import { combineReducers } from 'redux';
import nav from './navigationReducer';
import workoutReducer from './workoutReducer';

export default combineReducers({
  nav,
  workoutReducer
});
