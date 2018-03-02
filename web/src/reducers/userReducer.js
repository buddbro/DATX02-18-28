import { LOGIN, LOGOUT, REGISTER, SET_USER_ON_STARTUP } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  loggedIn: false,
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  error: '',
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

    case REGISTER:
      if(!action.payload.error) {
        const {email, password, name } = action.payload;
        return {
          ...state,
          loading: false,
          email,
          password,
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
