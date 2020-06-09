import * as R from 'ramda';

import matchAction from '../../core/matchAction';

export default (state = { user: null, password: '', updatingSettings: false }, action) =>
  matchAction(action, R.always({}), {
    LOGIN: ({ user }) => ({ user, updatingSettings: false }),
    UPDATE_SETTINGS_EMAIL: ({ email }) => ({ user: { email: email } }),
    UPDATE_SETTINGS_PASSWORD: R.pipe(R.prop('password'), R.objOf('password')),
    UPDATE_SETTINGS_IMAGE: ({ image }) => ({ user: { image } }),
    UPDATE_SETTINGS_BIO: ({ bio }) => ({ user: { bio } }),
    UPDATE_SETTINGS_USERNAME: ({ username }) => ({ user: { username } }),
    UPDATING_SETTINGS: R.always({ updatingSettings: true }),
    LOG_OUT: R.always({ user: null, password: '' }),
  }) |> R.mergeDeepRight(state);
