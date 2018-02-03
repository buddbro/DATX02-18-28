import { ADD_WORKOUT } from './types';
import { CHOOSE_WORKOUT } from './types';

import axios from 'axios';

export function chooseWorkout(id) {
  return dispatch => {
    axios.get(`http://37.139.0.80/api/workouts/${id}`).then(({ data }) => {
      dispatch({
        type: CHOOSE_WORKOUT,
        payload: data[0]
      });
    });
  };
}

export function addWorkout() {
  return { type: ADD_WORKOUT };
}
