import { GET_EXERCISE_DESCRIPTION } from '../actions/types';

const INITIAL_STATE = {
  exerciseHelp: { title: 'ehej' }
};

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_EXERCISE_DESCRIPTION:
      return {
        ...state,
        exerciseHelp: action.payload
      };
    default:
      return state;
  }
}
