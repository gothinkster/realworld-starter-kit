import { request } from '../agent';
import { parseError } from '../utils';

const PROFILE_REQUEST = Symbol('PROFILE_REQUEST');
const PROFILE_SUCCESS = Symbol('PROFILE_SUCCESS');
const PROFILE_FAILURE = Symbol('PROFILE_FAILURE');

const PROFILE_FOLLOW_REQUEST = Symbol('PROFILE_FOLLOW_REQUEST');
const PROFILE_FOLLOW_SUCCESS = Symbol('PROFILE_FOLLOW_SUCCESS');
const PROFILE_FOLLOW_FAILURE = Symbol('PROFILE_FOLLOW_FAILURE');

const CLEAR_ERRORS = Symbol('PROFILE_CLEAR_ERRORS');

const initialState = {};

export default function profileReduser(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return { ...action.payload.profile };
    case PROFILE_FAILURE:
      return { ...initialState, error: action.error };

    case PROFILE_FOLLOW_SUCCESS:
      return { ...action.payload.profile };

    case CLEAR_ERRORS: // eslint-disable-line no-case-declarations
      const { error, ...nextState } = state;
      // eslint-disable-line no-case-declarations, no-unused-vars
      return nextState; // eslint-disable-line no-case-declarations

    default:
      return state;
  }
}

export function getProfile({ req, author }) {
  return (dispatch) => {
    dispatch({ type: PROFILE_REQUEST });

    return request(req, {
      method: 'get',
      url: `/profiles/${decodeURIComponent(author)}`,
    }).then(
      response => dispatch({ type: PROFILE_SUCCESS, payload: response.data }),
      error => dispatch({ type: PROFILE_FAILURE, error: parseError(error) }),
    );
  };
}

export function follow({ author, method }) {
  if (method !== 'post' && method !== 'delete') {
    return { type: PROFILE_FOLLOW_FAILURE, error: { message: 'Only post or delete methos alowed' } };
  }
  return (dispatch) => {
    dispatch({ type: PROFILE_FOLLOW_REQUEST });
    return request(undefined, {
      method,
      url: `/profiles/${author}/follow`,
    }).then(
      response => dispatch({ type: PROFILE_FOLLOW_SUCCESS, payload: response.data }),
      error => dispatch({ type: PROFILE_FOLLOW_FAILURE, error: parseError(error) }),
    );
  };
}

export function clearErrors() {
  return { type: CLEAR_ERRORS };
}
