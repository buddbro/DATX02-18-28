import { FETCH_EXERCISE_LIST } from '../actions/types';

const INITIAL_STATE = {
  exerciseList: []
};

export default function workoutReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXERCISE_LIST:
      return {
        ...state,
        exerciseList: action.payload
      };
    default:
      return state;
  }
}
