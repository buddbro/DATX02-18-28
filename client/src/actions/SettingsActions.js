import { INCREASE, DECREASE } from './types';

export function increase(amount) {
  return {
    type: INCREASE,
    payload: { amount: amount }
  };
}

export function decrease() {
  return {
    type: DECREASE
  };
}
