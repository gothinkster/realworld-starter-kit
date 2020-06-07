import store from '../store';
import * as R from 'ramda';
import * as conduit from '../services/conduit';

export function updateEmail(email) {
  store.dispatch({ type: 'UPDATE_SETTINGS_EMAIL', email });
}

export function updatePassword(password) {
  store.dispatch({ type: 'UPDATE_SETTINGS_PASSWORD', password });
}

export function updateImage(image) {
  store.dispatch({ type: 'UPDATE_SETTINGS_IMAGE', image });
}

export function updateBio(bio) {
  store.dispatch({ type: 'UPDATE_SETTINGS_BIO', bio });
}

export function updateUsername(username) {
  store.dispatch({ type: 'UPDATE_SETTINGS_USERNAME', username });
}

export async function updateSettings({ settings: { user, password } }) {
  store.dispatch({ type: 'UPDATING_SETTINGS' });
  const result = await conduit.updateSettings(
    R.empty(password) ? user : R.assoc('password', password, user),
  );

  localStorage.setItem('token', result.user.token);
  store.dispatch({ type: 'LOGIN', user: result.user });
}
