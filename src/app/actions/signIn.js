import store from '../store';
import { login } from '../services/conduit';
import * as R from 'ramda';

export function updateUsername(username) {
  store.dispatch({ type: 'UPDATE_USERNAME', username });
}

export function updatePassword(password) {
  store.dispatch({ type: 'UPDATE_PASSWORD', password });
}

export async function userLogin({ signIn: { username, password } }) {
  store.dispatch({ type: 'LOGIN_START' });
  const result = await login(username, password);

  if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
    R.forEach(store.dispatch, [{ type: 'LOGIN_ERROR', errors: result.errors }]);
  } else {
    localStorage.setItem('token', result.user.token);
    store.dispatch({ type: 'LOGIN', user: result.user });
    location.hash = `#/`; /* eslint-disable-line */
  }
}
