import { FETCH_EXERCISE_LIST } from './types';

import axios from 'axios';

export function fetchExerciseList() {
  return dispatch => {
    axios.get(`https://getpushapp.com/api/exercises`).then(({ data }) => {
      //console.log(data);
      dispatch({
        type: FETCH_EXERCISE_LIST,
        payload: data
      });
    });
  };
}
