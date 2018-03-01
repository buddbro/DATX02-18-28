import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOADING_FALSE,
  SEND_FORGOT_PASSWORD
} from './types';

import { AsyncStorage } from 'react-native';

import sha256 from 'sha256';
import axios from 'axios';

export function retrievePassword(email) {
  return dispatch => {
    axios
      .post('https://getpushapp.com/api/users/resetpassword', {
        email
      })
      .then(({ data }) => {
        dispatch({
          type: SEND_FORGOT_PASSWORD,
          payload: data.success
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function loginWithPassword(email, password) {
  return dispatch => {
    axios
      .post('https://getpushapp.com/api/login', {
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
          AsyncStorage.setItem('jwt', data.token).then(() => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                id: data.id,
                name: data.name,
                email
              }
            });
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
    AsyncStorage.getItem('jwt').then(jwt => {
      if (jwt) {
        axios
          .get('https://getpushapp.com/api/verifytoken', {
            headers: { Authorization: `Bearer ${jwt}` }
          })
          .then(({ data }) => {
            if (!data.error) {
              dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                  name: data.name,
                  email: data.email
                }
              });
            } else {
              dispatch({
                type: LOADING_FALSE
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        dispatch({
          type: LOADING_FALSE
        });
      }
    });
  };
}

export function logout(id) {
  return dispatch => {
    AsyncStorage.removeItem('jwt').then(() => {
      dispatch({
        type: LOGOUT
      });
    });
  };
}
