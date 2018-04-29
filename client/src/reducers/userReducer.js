import {
  EDIT_USER,
  FETCH_ACHIEVEMENTS,
  LOADING_FALSE,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SEND_FORGOT_PASSWORD
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
  errorCode: 0,
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
      const { error, errorCode } = action.payload;
      return { ...state, error, errorCode };
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
        errorCode: 0,
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
