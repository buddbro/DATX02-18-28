import { ADD_WORKOUT } from './types';
import { CHOOSE_WORKOUT } from './types';
import { FETCH_WORKOUTS } from './types';
import { CLEAR_WORKOUT } from './types';

import axios from 'axios';

export function chooseWorkout(id) {
  return dispatch => {
    axios.get(`https://getpushapp.com/api/workouts/${id}`).then(({ data }) => {
      console.log(data);
      dispatch({
        type: CHOOSE_WORKOUT,
        payload: data
      });
    });
  };
}

export function clearWorkout() {
  return { type: CLEAR_WORKOUT };
}

export function fetchWorkouts(id, token) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/workouts`, { id, token })
      .then(({ data }) => {
        dispatch({
          type: FETCH_WORKOUTS,
          payload: data
        });
      });
  };
}

export function addWorkout() {
  return { type: ADD_WORKOUT };
}
