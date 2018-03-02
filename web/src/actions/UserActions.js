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

export function register(email, passwordone, passwordtwo) {
  return dispatch => {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;
    if(!(passwordone === passwordtwo)) {
      dispatch({
        type: REGISTER,
        payload: { email: '', name: '', error: 'Passwords does not match' }
      });
    } else if (!emailRegex.test(email)) {
      dispatch({
        type: REGISTER,
        payload: { email: '', name: '', error: 'Invalid email' }
      });
    } else {
      axios
        .post(`${API_ENDPOINT}/users/register`, { email, passwordone })
        .then(({ data }) => {
          const { error, name } = data;
          dispatch({
            type: REGISTER,
            payload: { email, passwordone, name, error: error || '' }
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  }
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
