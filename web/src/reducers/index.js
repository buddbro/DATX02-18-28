import { combineReducers } from 'redux';
import user from './userReducer';
import exercises from './exerciseReducer';
import workouts from './workoutReducer';

export default combineReducers({
  user,
  exercises,
  workouts
});
