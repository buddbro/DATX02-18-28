import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOADING_FALSE,
  SEND_FORGOT_PASSWORD,
  FETCH_ACHIEVEMENTS,
  EDIT_USER
} from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  email: '',
  name: '',
  age: 0,
  height: 0,
  weight: 0,
  notifications: false,
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
      const {
        email,
        name,
        age,
        height,
        weight,
        notifications
      } = action.payload;
      return {
        ...state,
        email,
        name,
        age,
        height,
        weight,
        notifications,
        error: '',
        loading: false
      };
    case LOGOUT:
      return { ...INITIAL_STATE, loading: false };
    case EDIT_USER:
      return {
        ...INITIAL_STATE,
        email: action.payload.email,
        name: action.payload.name,
        age: Number(action.payload.age),
        height: Number(action.payload.height),
        weight: Number(action.payload.weight),
        notifications: action.payload.notifications
      };
    case FETCH_ACHIEVEMENTS:
      const achievements = action.payload;
      return { ...state, achievements };
    default:
      return state;
  }
}
