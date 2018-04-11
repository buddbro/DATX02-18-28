import { FETCH_ACHIEVEMENTS } from './types';

import { AsyncStorage } from 'react-native';

import axios from 'axios';

export function fetchAchievements() {
  return dispatch => {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(`https://getpushapp.com/api/user/achievements`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(({ data }) => {
          dispatch({
            type: FETCH_ACHIEVEMENTS,
            payload: data
          });
        });
    });
  };
}
