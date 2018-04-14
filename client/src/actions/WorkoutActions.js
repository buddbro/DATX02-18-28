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
  DELETE_EXERCISE_FROM_WORKOUT,
  ADD_SET_TO_EXERCISE,
  GET_SETS_FOR_EXERCISE,
  VIEW_SET,
  VIEW_EXERCISE,
  SET_DIFFICULTY,
  SAVE_NOTES,
  SET_COLOR
} from './types';

import { AsyncStorage } from 'react-native';

import axios from 'axios';

export function chooseWorkout(id) {
  if (id === -1) {
    return {
      type: CHOOSE_WORKOUT
    };
  }
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(`https://getpushapp.com/api/workouts/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          const exercises = data;
          const sets = {};
          dispatch({
            type: CHOOSE_WORKOUT,
            payload: { exercises, sets, difficulty: data[0].difficulty }
          });
        });
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

export function editWorkout(id, properties) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .patch(`https://getpushapp.com/api/workouts/${id}`, properties, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: EDIT_WORKOUT,
            payload: properties
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
          const { id, title, date, difficulty, notes, start } = data;
          dispatch({
            type: ADD_WORKOUT,
            payload: { id, title, date, difficulty, notes, start }
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

export function deleteExerciseFromWorkout(exerciseId) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .delete(`https://getpushapp.com/api/workouts/exercise/${exerciseId}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: DELETE_EXERCISE_FROM_WORKOUT,
            payload: exerciseId
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

export function setDifficulty(id, level) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .patch(
          `https://getpushapp.com/api/workouts/difficulty/${id}`,
          { level },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          dispatch({
            type: SET_DIFFICULTY,
            payload: level
          });
        });
    });
  };
}

export function saveNotes(id, notes) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .patch(
          `https://getpushapp.com/api/workouts/notes/${id}`,
          { notes },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(() => {
          dispatch({
            type: SAVE_NOTES
          });
        });
    });
  };
}

export function setColor(id, color) {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .patch(
          `https://getpushapp.com/api/workouts/color/${id}`,
          { color },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(() => {
          dispatch({
            type: SET_COLOR,
            payload: color
          });
        });
    });
  };
}
