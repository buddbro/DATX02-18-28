import {
  ADD_EXERCISE_TO_WORKOUT,
  ADD_SET_TO_EXERCISE,
  ADD_WORKOUT_FROM_SCHEDULE,
  ADD_WORKOUT,
  CHOOSE_WORKOUT,
  CLEAR_EXERCISE,
  CLEAR_WORKOUT,
  COPY_SET,
  DELETE_EXERCISE_FROM_WORKOUT,
  DELETE_SET,
  DELETE_WORKOUT,
  EDIT_WORKOUT,
  FETCH_WORKOUTS,
  GET_SETS_FOR_EXERCISE,
  SET_COLOR,
  SET_DIFFICULTY,
  VIEW_EXERCISE,
  VIEW_SET
} from '../actions/types';

const INITIAL_STATE = {
  id: -1,
  workouts: [],
  exercises: [],
  sets: [],
  visibleExerciseId: -1,
  visibleExercise: '',
  visibleSet: -1,
  exerciseLoading: true
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
        sets: action.payload,
        exerciseLoading: false
      };
      return state;
    case ADD_SET_TO_EXERCISE:
      return {
        ...state,
        sets: [
          {
            id: action.payload.id,
            reps: action.payload.reps,
            weight: action.payload.weight
          },
          ...state.sets
        ]
      };
    case COPY_SET:
      return {
        ...state,
        sets: [
          {
            id: action.payload.id,
            reps: action.payload.reps,
            weight: action.payload.weight
          },
          ...state.sets
        ]
      };
    case ADD_EXERCISE_TO_WORKOUT:
      return {
        ...state,
        exercises: [
          ...state.exercises,
          { id: action.payload.id, title: action.payload.title, sets: [] }
        ]
      };
    case DELETE_EXERCISE_FROM_WORKOUT:
      const deleteExercises = state.exercises.reduce((acc, next) => {
        if (next.id !== action.payload) {
          return [...acc, next];
        }
        return acc;
      }, []);

      return {
        ...state,
        exercises: deleteExercises
      };
    case CHOOSE_WORKOUT:
      if (!action.payload) {
        return INITIAL_STATE;
      } else {
        let exercises = action.payload.exercises.reduce((acc, next) => {
          return [
            ...acc,
            {
              id: next.exercise_id,
              title: next.exercise_title,
              exercise_type_id: next.exercise_type_id
            }
          ];
        }, []);
        const { workout_id } = action.payload.exercises[0];

        return {
          ...state,
          id: workout_id,
          exercises: exercises[0].id ? exercises : []
        };
      }
    case ADD_WORKOUT:
      const { id, title, date, difficulty, start } = action.payload;

      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        date: action.payload.date,
        exercises: [],
        workouts: [
          {
            id,
            title,
            date,
            difficulty,
            notes: '',
            start,
            stop: '',
            color: ''
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
    case DELETE_SET:
      const setsWithoutDeleted = [];
      state.sets.map(set => {
        if (set.id !== action.payload) {
          setsWithoutDeleted.push(set);
        }
      });

      return {
        ...state,
        sets: setsWithoutDeleted
      };
    case CLEAR_WORKOUT:
      return {
        ...state,
        id: -1,
        title: '',
        date: '',
        exercises: [],
        exerciseLoading: true
      };
    case CLEAR_EXERCISE:
      return {
        ...state,
        exerciseLoading: true
      };
    case EDIT_WORKOUT:
      const editWorkouts = [];
      state.workouts.forEach(workout => {
        editWorkouts.push(workout);
        if (state.id === workout.id) {
          workout.title = action.payload.title;
          workout.start = action.payload.start;
          workout.stop = action.payload.stop;
        }
      });

      return {
        ...state,
        workouts: editWorkouts
      };
    case FETCH_WORKOUTS:
      return { ...state, workouts: action.payload };

    case SET_COLOR:
      const setColorWorkouts = JSON.parse(JSON.stringify(state.workouts));
      setColorWorkouts.map(workout => {
        if (state.id === workout.id) {
          workout.color = action.payload;
        }
      });

      return {
        ...state,
        workouts: setColorWorkouts
      };
    case SET_DIFFICULTY:
      const setDifficultyWorkouts = [];
      state.workouts.forEach(workout => {
        setDifficultyWorkouts.push(workout);
        if (state.id === workout.id) {
          workout.difficulty = action.payload;
        }
      });
      return { ...state, workouts: setDifficultyWorkouts };
    default:
      return state;
  }
}
