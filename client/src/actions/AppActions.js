import {
  GET_EXERCISE_DESCRIPTION,
  SET_EXERCISE_LIST_TYPE,
  GET_QUOTE,
  GET_SELECTED_DATE
} from './types.js';
import axios from 'axios';

export function getSelectedDate(date) {
  return {
    type: GET_SELECTED_DATE,
    payload: date
  };
}

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

export function getQuote() {
  return dispatch => {
    axios.get(`https://getpushapp.com/api/quote`).then(({ data }) => {
      dispatch({
        type: GET_QUOTE,
        payload: data
      });
    });
  };
}

export function setExerciseListType(type) {
  return {
    type: SET_EXERCISE_LIST_TYPE,
    payload: type
  };
}
