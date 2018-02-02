import { CHOOSE_WORKOUT } from '../actions/types';

function workoutReducer(state = { id: -1 }, action) {
  console.log('workoutReducer');
  console.log(action);
  switch (action.type) {
    // case CHOOSE_WORKOUT:
    //   return ;
    default:
      return state;
  }
}
