import { INCREASE, DECREASE } from '../actions/types';

const INITIAL_STATE = {
  title: 'Rubrik',
  name: 0,
  counter: 0,
  stuff: 42
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.payload.amount
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}
