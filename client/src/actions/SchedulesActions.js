import {
  SET_ACTIVE_SCHEDULE,
  ADD_SCHEDULE,
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  FETCH_SCHEDULES,
  ADD_EXERCISE_TO_SCHEDULE,
  DELETE_EXERCISE_FROM_SCHEDULE
} from './types.js';
import axios from 'axios';

import { AsyncStorage } from 'react-native';

export function setActiveSchedule(id, title) {
  return {
    type: SET_ACTIVE_SCHEDULE,
    payload: { id, title }
  };
}

export function addSchedule() {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .post(
          `https://getpushapp.com/api/schedules/`,
          {},
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          dispatch({
            type: ADD_SCHEDULE,
            payload: { id: data.id, title: data.title }
          });
        });
    });
  };
}

export function deleteSchedule(id) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .delete(`https://getpushapp.com/api/schedules/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(() => {
          dispatch({
            type: DELETE_SCHEDULE,
            payload: id
          });
        });
    });
  };
}

export function editSchedule(id, title) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .put(
          `https://getpushapp.com/api/schedules/${id}`,
          { title },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(() => {
          dispatch({
            type: EDIT_SCHEDULE,
            payload: { id, title }
          });
        });
    });
  };
}

export function deleteExerciseFromSchedule(exerciseId) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .delete(`https://getpushapp.com/api/schedules/exercise/${exerciseId}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(() => {
          dispatch({
            type: DELETE_EXERCISE_FROM_SCHEDULE,
            payload: exerciseId
          });
        });
    });
  };
}

export function addExerciseToSchedule(exerciseId, exerciseName, schedule) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .post(
          `https://getpushapp.com/api/schedules/exercise`,
          { exercise: exerciseId, schedule },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(() => {
          dispatch({
            type: ADD_EXERCISE_TO_SCHEDULE,
            payload: { id: exerciseId, name: exerciseName }
          });
        });
    });
  };
}

export function fetchSchedules() {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(`https://getpushapp.com/api/schedules`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: FETCH_SCHEDULES,
            payload: data
          });
        });
    });
  };
}
