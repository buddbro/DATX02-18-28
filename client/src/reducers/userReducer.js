import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOADING_FALSE,
  SEND_FORGOT_PASSWORD
} from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  id: '',
  email: '',
  name: '',
  token: '',
  error: '',
  resetStatus: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_FORGOT_PASSWORD:
      return { ...state, resetStatus: action.payload ? 'A link for resetting your password was sent, please check your email.' : 'Email not registered.'}
    case LOADING_FALSE:
      return { ...state, loading: false };
    case LOGIN_ERROR:
      const { error } = action.payload;
      return { ...state, error };
    case LOGIN_SUCCESS:
      const { id, email, name, token } = action.payload;
      return { ...state, id, email, name, token, error: '', loading: false };
    case LOGOUT:
      return { ...INITIAL_STATE, loading: false };
    default:
      return state;
  }
}
