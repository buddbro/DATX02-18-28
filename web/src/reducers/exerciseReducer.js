import {
  FETCH_EXERCISES,
  FETCH_EXERCISE_SECTIONS,
  EDIT_EXERCISE,
  ADD_EXERCISE,
  DELETE_EXERCISE
} from '../actions/types';

const INITIAL_STATE = {
  sections: [],
  list: []
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXERCISE_SECTIONS:
      return {
        ...state,
        sections: action.payload
      };
    case FETCH_EXERCISES:
      return {
        ...state,
        list: action.payload
      };
    case ADD_EXERCISE:
      const { id, name, section, description } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id,
            name,
            exercise_type: state.sections.filter(s => s.id === section)[0]
              .title,
            description
          }
        ]
      };
    case DELETE_EXERCISE:
      const listWithDeletedExercise = state.list.reduce((acc, next) => {
        return action.payload.id === next.id ? acc : [...acc, next];
      }, []);

      return {
        ...state,
        list: listWithDeletedExercise
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
