import {
  GET_EXERCISE_DESCRIPTION,
  GET_QUOTE,
  GET_SELECTED_DATE,
  SET_EXERCISE_LIST_TYPE,
  SET_WORKOUT_PARENT
} from '../actions/types';

const INITIAL_STATE = {
  exerciseHelp: { title: '' },
  exerciseListType: '',
  workoutParent: 'Dashboard',
  quote: '',
  author: '',
  selectedDate: ''
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
    case SET_WORKOUT_PARENT:
      return {
        ...state,
        workoutParent: action.payload
      };
    case GET_QUOTE:
      return {
        ...state,
        quote: action.payload.text,
        author: action.payload.author
      };
    case GET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    default:
      return state;
  }
}
