import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  id: '',
  email: '',
  name: '',
  token: '',
  error: ''
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_ERROR:
      const { error } = action.payload;
      return { ...state, error };
    case LOGIN_SUCCESS:
      const { id, email, name, token } = action.payload;
      return { ...state, id, email, name, token, error: '' };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
