import { combineReducers } from 'redux';
import nav from './navigationReducer';
import loginNav from './loginNavigationReducer';

export default combineReducers({
  nav,
  loginNav
});
