import { ADD_WORKOUT } from './types';
import { CHOOSE_WORKOUT } from './types';

export function addWorkout() {
  return { type: ADD_WORKOUT };
}

export function chooseWorkout() {
  return { type: CHOOSE_WORKOUT };
}
