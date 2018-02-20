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
  sent: false,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_FORGOT_PASSWORD:
      return {
        ...state,
        resetStatus: action.payload, sent: true
      };
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
