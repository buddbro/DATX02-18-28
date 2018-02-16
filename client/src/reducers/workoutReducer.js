import {
  CHOOSE_WORKOUT,
  FETCH_WORKOUTS,
  CLEAR_WORKOUT,
  EDIT_WORKOUT,
  ADD_WORKOUT,
  DELETE_WORKOUT,
  ADD_EXERCISE_TO_WORKOUT,
  ADD_SET_TO_EXERCISE,
  GET_SETS_FOR_EXERCISE,
  VIEW_EXERCISE,
  VIEW_SET
} from '../actions/types';

const INITIAL_STATE = {
  id: -1,
  title: '',
  date: '',
  workouts: [],
  exercises: [],
  sets: [],
  visibleExerciseId: -1,
  visibleExercise: '',
  visibleSet: -1
};

export default function workoutReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VIEW_EXERCISE:
      return {
        ...state,
        visibleExercise: action.payload.name,
        visibleExerciseId: action.payload.typeId
      };
      return state;
    case VIEW_SET:
      return {
        ...state,
        visibleSet: action.payload === state.visibleSet ? -1 : action.payload
      };
      return state;
    case GET_SETS_FOR_EXERCISE:
      return {
        ...state,
        sets: action.payload
      };
      return state;
    case ADD_SET_TO_EXERCISE:
      return {
        ...state,
        sets: [
          ...state.sets,
          {
            id: action.payload.id,
            reps: action.payload.reps,
            weight: action.payload.weight
          }
        ]
      };
    case ADD_EXERCISE_TO_WORKOUT:
      return {
        ...state,
        exercises: [
          ...state.exercises,
          { id: action.payload.id, title: action.payload.title }
        ]
      };
    case CHOOSE_WORKOUT:
      let exercises = action.payload.reduce((acc, next) => {
        return [
          ...acc,
          {
            id: next.exercise_id,
            title: next.exercise_title,
            exercise_type_id: next.exercise_type_id
          }
        ];
      }, []);

      const { workout_id, workout_title, date } = action.payload[0];

      return {
        ...state,
        id: workout_id,
        title: workout_title,
        date,
        exercises: exercises[0].id ? exercises : []
      };
    case ADD_WORKOUT:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        date: action.payload.date,
        exercises: [],
        workouts: [
          {
            id: action.payload.id,
            title: action.payload.title,
            date: action.payload.date
          },
          ...state.workouts
        ]
      };
    case DELETE_WORKOUT:
      return {
        ...INITIAL_STATE,
        workouts: state.workouts.filter(
          workout => workout.id !== action.payload
        )
      };
    case CLEAR_WORKOUT:
      return {
        ...state,
        id: -1,
        title: '',
        date: '',
        exercises: []
      };
    case EDIT_WORKOUT:
      return {
        ...state,
        title: action.payload.title
      };
    case FETCH_WORKOUTS:
      const workouts = action.payload;
      return { ...state, workouts };
    default:
      return state;
  }
}
