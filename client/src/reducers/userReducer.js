import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOADING_FALSE,
  SEND_FORGOT_PASSWORD,
  FETCH_ACHIEVEMENTS
} from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  email: '',
  name: '',
  error: '',
  resetStatus: '',
  sent: false,
  achievements: []
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_FORGOT_PASSWORD:
      return {
        ...state,
        resetStatus: action.payload,
        sent: true
      };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case LOGIN_ERROR:
      const { error } = action.payload;
      return { ...state, error };
    case LOGIN_SUCCESS:
      const { email, name } = action.payload;
      return { ...state, email, name, error: '', loading: false };
    case LOGOUT:
      return { ...INITIAL_STATE, loading: false };
    case FETCH_ACHIEVEMENTS:
      const achievements = action.payload;
      return {...state, achievements }
    default:
      return state;
  }
}
