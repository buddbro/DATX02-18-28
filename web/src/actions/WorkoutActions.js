import {
  FETCH_WORKOUTS
} from './types';
import axios from 'axios';

const API_ENDPOINT = 'https://getpushapp.com/api';

export function fetchWorkouts(id) {
  return dispatch => {
    axios
      .get(`${API_ENDPOINT}/users/${id}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_WORKOUTS,
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
