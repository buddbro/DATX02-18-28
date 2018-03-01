import {
  ADD_EXERCISE,
  DELETE_EXERCISE,
  FETCH_EXERCISES,
  FETCH_EXERCISE_SECTIONS,
  EDIT_EXERCISE
} from './types';
import axios from 'axios';

const API_ENDPOINT = 'https://getpushapp.com/api';

export function fetchExercises() {
  return dispatch => {
    axios
      .get(`${API_ENDPOINT}/exercises`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_EXERCISES,
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchExerciseSections() {
  return dispatch => {
    axios
      .get(`${API_ENDPOINT}/exercises/types`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_EXERCISE_SECTIONS,
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function addExercise(name, section, description) {
  return dispatch => {
    axios
      .post(`${API_ENDPOINT}/exercises/types`, { name, section, description })
      .then(({ data }) => {
        dispatch({
          type: ADD_EXERCISE,
          payload: { id: data, name, section, description }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteExercise(id) {
  return dispatch => {
    axios
      .delete(`${API_ENDPOINT}/exercises/${id}`)
      .then(({ data }) => {
        dispatch({
          type: DELETE_EXERCISE,
          payload: { id }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function editExercise(id, description) {
  return dispatch => {
    const token = localStorage.getItem('token');
    axios
      .patch(
        `${API_ENDPOINT}/exercises/${id}`,
        { description },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(() => {
        dispatch({
          type: EDIT_EXERCISE,
          payload: { id, description }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
