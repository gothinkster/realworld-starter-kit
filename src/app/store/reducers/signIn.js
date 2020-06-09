import * as R from 'ramda';
import matchAction from '../../core/matchAction';

const defaultState = {
  username: '',
  password: '',
  errors: [],
  logingIn: false,
};

export default (state = defaultState, action) =>
  matchAction(action, R.always({}), {
    CHANGE_PAGE: R.always(defaultState),
    UPDATE_USERNAME: ({ username }) => ({ username }),
    UPDATE_PASSWORD: ({ password }) => ({ password }),
    LOGIN_START: R.always({ logingIn: true }),
    LOGIN_ERROR: ({ errors }) => ({ errors, logingIn: false }),
  }) |> R.mergeDeepRight(state);
