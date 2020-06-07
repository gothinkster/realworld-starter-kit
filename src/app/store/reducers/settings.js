import * as R from 'ramda';

export default (state = { user: null, password: '', updatingSettings: false }, action) =>
  R.evolve(
    action.type === 'LOGIN'
      ? { user: R.always(action.user), updatingSettings: R.F }
      : action.type === 'UPDATE_SETTINGS_EMAIL'
      ? { user: { email: R.always(action.email) } }
      : action.type === 'UPDATE_SETTINGS_PASSWORD'
      ? { password: R.always(action.password) }
      : action.type === 'UPDATE_SETTINGS_IMAGE'
      ? { user: { image: R.always(action.image) } }
      : action.type === 'UPDATE_SETTINGS_BIO'
      ? { user: { bio: R.always(action.bio) } }
      : action.type === 'UPDATE_SETTINGS_USERNAME'
      ? { user: { username: R.always(action.username) } }
      : action.type === 'UPDATING_SETTINGS'
      ? { updatingSettings: R.T }
      : action.type === 'LOG_OUT'
      ? { user: R.always(null), password: R.always('') }
      : {},
  )(state);
