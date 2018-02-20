import { GET_EXERCISE_DESCRIPTION } from './types.js';
import axios from 'axios';

export function getExerciseDescription(id) {
  return dispatch => {
    axios
      .get(`https://getpushapp.com/api/exercises/description/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_EXERCISE_DESCRIPTION,
          payload: data[0]
        });
      });
  };
}
