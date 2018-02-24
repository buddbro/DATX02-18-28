import {
  ADD_WORKOUT,
  DELETE_WORKOUT,
  CHOOSE_WORKOUT,
  FETCH_WORKOUTS,
  EDIT_WORKOUT,
  SAVE_WORKOUT,
  CLEAR_WORKOUT,
  CLEAR_EXERCISE,
  ADD_EXERCISE_TO_WORKOUT,
  ADD_SET_TO_EXERCISE,
  GET_SETS_FOR_EXERCISE,
  VIEW_SET,
  VIEW_EXERCISE
} from './types';

import { AsyncStorage } from 'react-native';

import axios from 'axios';

export function chooseWorkout(id) {
  return dispatch => {
    axios.get(`https://getpushapp.com/api/workouts/${id}`).then(({ data }) => {
      const exercises = data;
      const sets = {};
      // axios
      //   .get(`https://getpushapp.com/api/workouts/${id}/sets`)
      //   .then(({ data }) => {
      //     const sets = data;
      dispatch({
        type: CHOOSE_WORKOUT,
        payload: { exercises, sets }
      });
      // });
    });
  };
}

export function clearWorkout() {
  return { type: CLEAR_WORKOUT };
}

export function clearExercise() {
  return { type: CLEAR_EXERCISE };
}

export function fetchWorkouts(id, token) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      console.log('fetch', jwt);
      axios
        .get(`https://getpushapp.com/api/workouts`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: FETCH_WORKOUTS,
            payload: data
          });
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

export function deleteWorkout(id, token, workout) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/workouts/delete/${workout}`, {
        id,
        token
      })
      .then(({ data }) => {
        dispatch({
          type: DELETE_WORKOUT,
          payload: workout
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

export function addSetToExercise(userId, token, exerciseId, reps, weight) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/workouts/exercise/${exerciseId}`, {
        userId,
        token,
        reps,
        weight
      })
      .then(({ data }) => {
        dispatch({
          type: ADD_SET_TO_EXERCISE,
          payload: { id: data[0].id, reps, weight }
        });
      });
  };
}

export function getSetsForExercise(id) {
  return dispatch => {
    axios
      .get(`https://getpushapp.com/api/workouts/exercise/${id}/sets`)
      .then(({ data }) => {
        dispatch({
          type: GET_SETS_FOR_EXERCISE,
          payload: data
        });
      });
  };
}

export function viewSet(id) {
  return {
    type: VIEW_SET,
    payload: id
  };
}

export function viewExercise(name, id, typeId) {
  return {
    type: VIEW_EXERCISE,
    payload: { name, id, typeId }
  };
}
