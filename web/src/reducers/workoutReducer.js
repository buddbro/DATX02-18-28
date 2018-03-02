import {
  FETCH_WORKOUTS
} from '../actions/types';

const INITIAL_STATE = {
  list: []
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WORKOUTS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
