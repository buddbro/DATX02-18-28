import { combineReducers } from 'redux';
import nav from './navigationReducer';
import workout from './workoutReducer';

export default combineReducers({
  nav,
  workout
});
