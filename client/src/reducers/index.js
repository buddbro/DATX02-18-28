import { combineReducers } from 'redux';
import nav from './navigationReducer';
import loggedInNavigation from './loggedInNavigationReducer';
import workout from './workoutReducer';
import exercises from './exercisesReducer';
import user from './userReducer';
import app from './appReducer';
import settings from './settingsReducer';
import schedules from './schedulesReducer';

export default combineReducers({
  nav,
  loggedInNavigation,
  workout,
  exercises,
  user,
  app,
  settings,
  schedules
});
