import { LOGIN, LOGOUT, REGISTER, SET_USER_ON_STARTUP } from './types';
import axios from 'axios';

const API_ENDPOINT = 'https://getpushapp.com/api';

export function login(email, password) {
  return dispatch => {
    axios
      .post(`${API_ENDPOINT}/login`, { email, password })
      .then(({ data }) => {
        const { error, token, name } = data;
        localStorage.setItem('token', token);
        dispatch({
          type: LOGIN,
          payload: { email, name, error: error || '' }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function logout() {
  localStorage.removeItem('token');
  return { type: LOGOUT };
}

export function verifyToken() {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get(`${API_ENDPOINT}/verifytoken`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(({ data }) => {
          const { error, email, name } = data;
          console.log(email, name);
          dispatch({
            type: LOGIN,
            payload: { email, name, error: error || '' }
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      dispatch({
        type: LOGIN,
        payload: { email: '', name: '', error: 'Not logged in' }
      });
    }
  };
}
