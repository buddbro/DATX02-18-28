import {
  ADD_WORKOUT,
  ADD_WORKOUT_FROM_SCHEDULE,
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

export function fetchWorkouts() {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
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

export function editWorkout(id, title) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .patch(
          `https://getpushapp.com/api/workouts/${id}`,
          { title },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          console.log(data);
          dispatch({
            type: EDIT_WORKOUT,
            payload: { title }
          });
        });
    });
  };
}

export function addWorkout(schedule) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .post(
          `https://getpushapp.com/api/workouts`,
          { schedule },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          const { id, title, date } = data;
          dispatch({
            type: ADD_WORKOUT_FROM_SCHEDULE,
            payload: { id, title, date }
          });
        });
    });
  };
}

export function deleteWorkout(workout) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .delete(`https://getpushapp.com/api/workouts/${workout}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: DELETE_WORKOUT,
            payload: workout
          });
        });
    });
  };
}

export function addExerciseToWorkout(workoutId, exerciseId) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .post(
          `https://getpushapp.com/api/workouts/exercise`,
          {
            workoutId,
            exerciseId
          },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          dispatch({
            type: ADD_EXERCISE_TO_WORKOUT,
            payload: { id: data[0].id, title: data[0].title }
          });
        });
    });
  };
}

export function addSetToExercise(exerciseId, reps, weight) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .post(
          `https://getpushapp.com/api/workouts/exercise/${exerciseId}`,
          {
            reps,
            weight
          },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          dispatch({
            type: ADD_SET_TO_EXERCISE,
            payload: { id: data[0].id, reps, weight }
          });
        });
    });
  };
}

export function getSetsForExercise(id) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(`https://getpushapp.com/api/workouts/exercise/${id}/sets`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: GET_SETS_FOR_EXERCISE,
            payload: data
          });
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
