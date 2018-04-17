import {
  ADD_EXERCISE_TO_SCHEDULE,
  ADD_SCHEDULE,
  DELETE_EXERCISE_FROM_SCHEDULE,
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  FETCH_SCHEDULES,
  SET_ACTIVE_SCHEDULE
} from '../actions/types';

const INITIAL_STATE = {
  active: { id: -1, title: '' },
  list: {}
};

export default function schedulesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SCHEDULES:
      return {
        ...state,
        list: action.payload
      };
    case SET_ACTIVE_SCHEDULE:
      const { id, title } = action.payload;
      return {
        ...state,
        active: { id, title }
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        list: {
          [action.payload.id]: { title: action.payload.title, exercises: [] },
          ...state.list
        }
      };
    case DELETE_SCHEDULE:
      let newDeleteList = {};
      Object.keys(state.list).forEach(schedule => {
        if (action.payload !== schedule) {
          newDeleteList[schedule] = state.list[schedule];
        }
      });
      return {
        ...state,
        list: newDeleteList
      };
    case EDIT_SCHEDULE:
      let newEditList = {};
      Object.keys(state.list).forEach(schedule => {
        if (action.payload.id === schedule) {
          newEditList[schedule] = {
            title: action.payload.title,
            exercises: state.list[schedule].exercises
          };
        } else {
          newEditList[schedule] = state.list[schedule];
        }
      });
      return {
        ...state,
        list: newEditList
      };
    case ADD_EXERCISE_TO_SCHEDULE:
      return {
        ...state,
        list: {
          ...state.list,
          [state.active.id]: {
            title: state.active.title,
            exercises: [
              ...state.list[state.active.id].exercises,
              { id: action.payload.id, name: action.payload.name }
            ]
          }
        }
      };
    case DELETE_EXERCISE_FROM_SCHEDULE:
      let newList = {};
      Object.keys(state.list).forEach(schedule => {
        newList[schedule] = {
          title: state.list[schedule].title,
          exercises: []
        };

        state.list[schedule].exercises.forEach(exercise => {
          if (exercise.id !== action.payload) {
            newList[schedule].exercises = [
              ...newList[schedule].exercises,
              exercise
            ];
          }
        });
      });
      return {
        ...state,
        list: newList
      };
    default:
      return state;
  }
}
