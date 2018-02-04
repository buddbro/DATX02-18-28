import { CHOOSE_WORKOUT } from '../actions/types';
import { FETCH_WORKOUTS } from '../actions/types';

const INITIAL_STATE = {
  id: -1,
  title: '',
  date: '',
  workouts: []
};

export default function workoutReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHOOSE_WORKOUT:
      const { id, title, date } = action.payload;
      return { ...state, id, title, date };
    case FETCH_WORKOUTS:
      const workouts = action.payload;
      return { ...state, workouts };
    default:
      return state;
  }
}
