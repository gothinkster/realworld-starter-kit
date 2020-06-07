import * as R from 'ramda';

const defaultState = {
  username: '',
  password: '',
  errors: [],
  logingIn: false,
};

export default (state = defaultState, action) => {
  return action.type === 'CHANGE_PAGE'
    ? defaultState
    : action.type === 'UPDATE_USERNAME'
    ? R.mergeDeepRight(state, { username: action.username })
    : action.type === 'UPDATE_PASSWORD'
    ? R.mergeDeepRight(state, { password: action.password })
    : action.type === 'LOGIN_START'
    ? R.mergeDeepRight(state, { logingIn: true })
    : action.type === 'LOGIN_ERROR'
    ? R.mergeDeepRight(state, { errors: action.errors, logingIn: false })
    : state;
};
