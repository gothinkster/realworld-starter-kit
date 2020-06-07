import * as R from 'ramda';

export default (state = { page: '', user: null, loading: true }, action) => {
  return action.type === 'CHANGE_PAGE'
    ? R.mergeDeepRight(state, { page: action.page })
    : action.type === 'LOGIN'
    ? R.mergeDeepRight(state, { user: action.user })
    : action.type === 'LOAD'
    ? R.mergeDeepRight(state, { loading: false })
    : action.type === 'LOG_OUT'
    ? R.mergeDeepRight(state, { user: null, page: '' })
    : state;
};
