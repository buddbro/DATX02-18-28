import {
  FETCH_WORKOUTS
} from './types';
import axios from 'axios';

const API_ENDPOINT = 'https://getpushapp.com/api';

export function fetchWorkouts() {
  return dispatch => {
    const token = localStorage.getItem('token');

    axios
      .get(`${API_ENDPOINT}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
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
