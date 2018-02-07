import {
  ADD_WORKOUT,
  CHOOSE_WORKOUT,
  FETCH_WORKOUTS,
  EDIT_WORKOUT,
  SAVE_WORKOUT,
  CLEAR_WORKOUT,
  ADD_EXERCISE_TO_WORKOUT
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

export function editWorkout(userId, token, workoutId, title) {
  return dispatch => {
    axios
      .patch(`https://getpushapp.com/api/workouts/${workoutId}`, {
        userId,
        token,
        title
      })
      .then(({ data }) => {
        dispatch({
          type: EDIT_WORKOUT,
          payload: { title }
        });
      });
  };
}

export function addWorkout(id, token) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/workouts/new`, { id, token })
      .then(({ data }) => {
        dispatch({
          type: ADD_WORKOUT,
          payload: data[0]
        });
      });
  };
}

export function addExerciseToWorkout(userId, token, workoutId, exerciseId) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/workouts/exercise`, {
        userId,
        token,
        workoutId,
        exerciseId
      })
      .then(({ data }) => {
        dispatch({
          type: ADD_EXERCISE_TO_WORKOUT,
          payload: { id: data[0].id, title: data[0].title }
        });
      });
  };
}
