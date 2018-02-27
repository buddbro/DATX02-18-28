import { FETCH_EXERCISES, EDIT_EXERCISE } from '../actions/types';

const INITIAL_STATE = {
  list: []
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXERCISES:
      return {
        ...state,
        list: action.payload
      };
    case EDIT_EXERCISE:
      const list = [];
      state.list.forEach((exercise, index) => {
        const newExercise = exercise;
        if (exercise.id === action.payload.id) {
          newExercise.description = action.payload.description;
        }
        list.push(newExercise);
      });

      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
