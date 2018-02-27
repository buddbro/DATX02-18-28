import { FETCH_EXERCISES, EDIT_EXERCISE } from './types';
import axios from 'axios';

const API_ENDPOINT = 'https://getpushapp.com/api';

export function fetchExercises() {
  return dispatch => {
    axios
      .get(`${API_ENDPOINT}/exercises`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_EXERCISES,
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function editExercise(id, description) {
  return dispatch => {
    const token = localStorage.getItem('token');
    axios
      .patch(
        `${API_ENDPOINT}/exercises/${id}`,
        { description },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(() => {
        dispatch({
          type: EDIT_EXERCISE,
          payload: { id, description }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
