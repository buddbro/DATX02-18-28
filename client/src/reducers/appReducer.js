import {
  GET_EXERCISE_DESCRIPTION,
  SET_EXERCISE_LIST_TYPE
} from '../actions/types';

const INITIAL_STATE = {
  exerciseHelp: { title: '' },
  exerciseListType: ''
};

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_EXERCISE_DESCRIPTION:
      return {
        ...state,
        exerciseHelp: action.payload
      };
    case SET_EXERCISE_LIST_TYPE:
      return {
        ...state,
        exerciseListType: action.payload
      };
    default:
      return state;
  }
}
