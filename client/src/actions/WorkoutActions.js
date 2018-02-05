import {
  ADD_WORKOUT,
  CHOOSE_WORKOUT,
  FETCH_WORKOUTS,
  CLEAR_WORKOUT
} from './types';

import { AsyncStorage } from 'react-native';

import axios from 'axios';

export function chooseWorkout(id) {
  return dispatch => {
    axios.get(`https://getpushapp.com/api/workouts/${id}`).then(({ data }) => {
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

export function addWorkout(id, token) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/workouts/new`, { id, token })
      .then(({ data }) => {
        console.log(data[0]);
        dispatch({
          type: ADD_WORKOUT,
          payload: data[0]
        });
      });
  };
}
