import { combineReducers } from 'redux';
import user from './userReducer';
import exercises from './exerciseReducer';

export default combineReducers({
  user,
  exercises
});
