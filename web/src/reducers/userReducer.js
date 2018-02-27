import { LOGIN, LOGOUT, SET_USER_ON_STARTUP } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  loggedIn: false,
  email: '',
  firstname: '',
  lastname: '',
  error: ''
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      if (!action.payload.error) {
        const { email, name } = action.payload;
        return {
          ...state,
          loading: false,
          loggedIn: true,
          email,
          name
        };
      } else {
        return {
          ...INITIAL_STATE,
          loading: false
        };
      }

    case LOGOUT:
      return {
        ...INITIAL_STATE,
        loading: false
      };
    default:
      return state;
  }
}
