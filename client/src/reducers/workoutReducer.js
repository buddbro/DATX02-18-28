import { CHOOSE_WORKOUT } from '../actions/types';

const INITIAL_STATE = {
  id: -1,
  title: '',
  date: ''
};

export default function workoutReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHOOSE_WORKOUT:
      const { id, title, date } = action.payload;
      return { ...state, id, title, date };
    default:
      return state;
  }
}
