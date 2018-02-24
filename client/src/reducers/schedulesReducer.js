import {
  ADD_SCHEDULE,
  FETCH_SCHEDULES,
  DELETE_EXERCISE_FROM_SCHEDULE
} from '../actions/types';

const INITIAL_STATE = {
  list: {}
};

export default function schedulesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SCHEDULES:
      return {
        list: action.payload
      };
    case DELETE_EXERCISE_FROM_SCHEDULE:
      const newList = {};

      Object.keys(state.list).forEach(schedule => {
        newList[schedule] = [];
        state.list[schedule].forEach(exercise => {
          if (exercise.id !== action.payload) {
            newList[schedule] = [...newList[schedule], exercise];
          }
        });
      });
      return {
        list: newList
      };
    case ADD_SCHEDULE:
      return {
        ...state
      };
    default:
      return state;
  }
}
