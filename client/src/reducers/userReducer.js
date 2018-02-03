import { LOGIN } from '../actions/types';

const INITIAL_STATE = {
  id: '',
  email: '',
  name: '',
  token: ''
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}
