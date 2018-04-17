import {
  GET_EXERCISE_DESCRIPTION,
  SET_EXERCISE_LIST_TYPE,
  SET_WORKOUT_PARENT,
  GET_QUOTE,
  GET_SELECTED_DATE,
  READ_INSTRUCTION
} from './types.js';

import { AsyncStorage } from 'react-native';
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

export function readInstruction(exercise) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(`https://getpushapp.com/api/instructions/${exercise}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(() => {
          dispatch({
            type: READ_INSTRUCTION
          });
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

export function setWorkoutParent(screen) {
  return {
    type: SET_WORKOUT_PARENT,
    payload: screen
  };
}
