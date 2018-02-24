import {
  ADD_SCHEDULE,
  FETCH_SCHEDULES,
  DELETE_EXERCISE_FROM_SCHEDULE
} from './types.js';
import axios from 'axios';

export function addSchedule(id, token) {
  return dispatch => {
    axios
      .post(`https://getpushapp.com/api/schedules`, { id, token })
      .then(({ data }) => {
        dispatch({
          type: ADD_SCHEDULE,
          payload: data[0]
        });
      });
  };
}

export function deleteExerciseFromSchedule(exerciseId, userId, token) {
  console.log(userId, exerciseId);
  return dispatch => {
    axios
      .delete(
        `https://getpushapp.com/api/user/${userId}/schedules/exercise/${exerciseId}`
      )
      .then(() => {
        dispatch({
          type: DELETE_EXERCISE_FROM_SCHEDULE,
          payload: exerciseId
        });
      });
  };
}

export function fetchSchedules(id) {
  return dispatch => {
    axios
      .get(`https://getpushapp.com/api/user/${id}/schedules`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_SCHEDULES,
          payload: data
        });
      });
  };
}
