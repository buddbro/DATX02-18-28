import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './types';

import { AsyncStorage } from 'react-native';

import sha256 from 'sha256';
import axios from 'axios';

export function loginWithPassword(email, password) {
  return dispatch => {
    axios
      .post('https://getpushapp.com/api/users/login', {
        email,
        password: sha256(password)
      })
      .then(({ data }) => {
        if (data.error) {
          dispatch({
            type: LOGIN_ERROR,
            payload: { error: data.error }
          });
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { id: data.id, token: data.token, name: data.name, email }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function loginWithToken() {
  return dispatch => {
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        const token = value.substring(0, 64);
        const email = value.substring(64);

        axios
          .post('https://getpushapp.com/api/users/login/token', {
            email,
            token
          })
          .then(({ data }) => {
            if (!data.error) {
              dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                  id: data.id,
                  token: data.token,
                  name: data.name,
                  email
                }
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
}

export function logout(id) {
  return dispatch => {
    axios
      .post('https://getpushapp.com/api/users/logout', {
        id
      })
      .then(() => {
        dispatch({
          type: LOGOUT
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
