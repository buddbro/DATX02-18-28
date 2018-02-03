import { LOGIN } from './types';

import axios from 'axios';

export function login(user) {
  return { type: LOGIN, payload: user };
}
