import { ADD_SCHEDULE, FETCH_SCHEDULES } from '../actions/types';

const INITIAL_STATE = {
  list: []
};

export default function schedulesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SCHEDULES:
      return {
        list: action.payload
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        exerciseHelp: action.payload
      };
    default:
      return state;
  }
}
