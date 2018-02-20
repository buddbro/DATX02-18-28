import { FETCH_EXERCISE_LIST, INCREASE } from '../actions/types';

const INITIAL_STATE = {
  list: []
};

export default function workoutReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXERCISE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case INCREASE:
      return {
        list: [...state.list, action.payload.amount]
      };
    default:
      return state;
  }
}
