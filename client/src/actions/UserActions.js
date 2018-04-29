import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOADING_FALSE,
  SEND_FORGOT_PASSWORD,
  EDIT_USER
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
            payload: { error: data.error, errorCode: data.errorCode }
          });
        } else {
          AsyncStorage.setItem('jwt', data.token).then(() => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                id: data.id,
                name: data.name,
                email,
                age: data.age,
                height: data.height,
                weight: data.weight
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
                  email: data.email,
                  age: data.age,
                  height: data.height,
                  weight: data.weight
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

export function logout() {
  return dispatch => {
    AsyncStorage.removeItem('jwt').then(() => {
      dispatch({
        type: LOGOUT
      });
    });
  };
}

export function editUser(user) {
  user.age = Number(user.age);
  user.height = Number(user.height);
  user.weight = Number(user.weight);
  if (user.password) {
    user.password = sha256(user.password);
  }
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .patch(
          `https://getpushapp.com/api/user`,
          { ...user },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          dispatch({
            type: EDIT_USER,
            payload: user
          });
        });
    });
  };
}
