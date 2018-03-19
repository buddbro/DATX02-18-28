import {
  FETCH_WORKOUTS
} from '../actions/types';

const INITIAL_STATE = {
  list: []
};

export default function workouts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WORKOUTS:
      return {
        ...state,
        list: action.payload.workouts
      };
    default:
      return state;
  }
}
