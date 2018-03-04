import axios from 'axios';
import { request, setJWT } from '../agent';
import { parseError } from '../utils';

const SIGNUP_REQUEST = Symbol('USER_SIGNUP_REQUEST');
const SIGNUP_SUCCESS = Symbol('USER_SIGNUP_SUCCESS');
const SIGNUP_FAILURE = Symbol('USER_SIGNUP_FAILURE');

const LOGIN_REQUEST = Symbol('USER_LOGIN_REQUEST');
const LOGIN_SUCCESS = Symbol('USER_LOGIN_SUCCESS');
const LOGIN_FAILURE = Symbol('USER_LOGIN_FAILURE');

const LOGOUT_REQUEST = Symbol('USER_LOGOUT_REQUEST');
const LOGOUT_SUCCESS = Symbol('USER_LOGOUT_SUCCESS');
const LOGOUT_FAILURE = Symbol('USER_LOGOUT_FAILURE');

const USER_REQUEST = Symbol('USER_REQUEST');
const USER_SUCCESS = Symbol('USER_SUCCESS');
const USER_FAILURE = Symbol('USER_FAILURE');

const SAVE_REQUEST = Symbol('USER_SAVE_REQUEST');
const SAVE_SUCCESS = Symbol('USER_SAVE_SUCCESS');
const SAVE_FAILURE = Symbol('USER_SAVE_FAILURE');

const CLEAR_ERRORS = Symbol('USER_CLEAR_ERRORS');

const initialState = {};

export default function userReduser(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...action.payload.user };
    case SIGNUP_FAILURE:
      return { ...initialState, error: action.error };

    case LOGIN_SUCCESS:
      return { ...action.payload.user };
    case LOGIN_FAILURE:
      return { ...initialState, error: action.error };

    case LOGOUT_SUCCESS:
      return { ...initialState };
    case LOGOUT_FAILURE:
      return { ...state, error: action.error };

    case USER_SUCCESS:
      return { ...action.payload.user };
    case USER_FAILURE:
      return { ...state, error: action.error };

    case SAVE_SUCCESS:
      return { ...action.payload.user };
    case SAVE_FAILURE:
      return { ...state, error: action.error };

    case CLEAR_ERRORS: // eslint-disable-line no-case-declarations
      const { error, ...nextState } = state;
      // eslint-disable-line no-case-declarations, no-unused-vars
      return nextState; // eslint-disable-line no-case-declarations
    default:
      return state;
  }
}

export function signup({ username, email, password }) {
  return (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    return request(undefined, {
      method: 'post',
      url: '/users',
      data: { user: { username, email, password } },
    }).then(
      (response) => {
        setJWT(response.data.user.token);
        // set cookie with frontend server
        axios.post('/api/token', { token: response.data.user.token });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      },
      (error) => {
        setJWT(undefined);
        // clear cookie with frontend server
        axios.post('/api/token', { token: '' });
        dispatch({ type: SIGNUP_FAILURE, error: parseError(error) });
      },
    );
  };
}

export function login({ email, password }) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    return request(undefined, {
      method: 'post',
      url: '/users/login',
      data: { user: { email, password } },
    }).then(
      (response) => {
        setJWT(response.data.user.token);
        // set cookie with frontend server
        axios.post('/api/token', { token: response.data.user.token });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      },
      (error) => {
        setJWT(undefined);
        // clear cookie with frontend server
        axios.post('/api/token', { token: '' });
        dispatch({ type: LOGIN_FAILURE, error: parseError(error) });
      },
    );
  };
}

export function me({ req }) {
  return (dispatch) => {
    dispatch({ type: USER_REQUEST });

    return request(req, {
      method: 'get',
      url: '/user',
    }).then(
      response => dispatch({ type: USER_SUCCESS, payload: response.data }),
      error => dispatch({ type: USER_FAILURE, error: parseError(error) }),
    );
  };
}

export function save({ bio, email, image, username, password }) {
  if (!email || !username) {
    return { type: SAVE_FAILURE, error: { message: 'Empty username or email' } };
  }
  const user = { bio, email, image, username };
  if (password) {
    user.password = password;
  }

  return (dispatch) => {
    dispatch({ type: SAVE_REQUEST });

    return request(undefined, {
      method: 'put',
      url: '/user',
      data: { user },
    }).then(
      response => dispatch({ type: SAVE_SUCCESS, payload: response.data }),
      error => dispatch({ type: SAVE_FAILURE, error: parseError(error) }),
    );
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });

    // clear cookie with frontend server
    return axios.post('/api/token', { token: '' })
      .then(
        () => {
          setJWT(undefined);
          dispatch({ type: LOGOUT_SUCCESS });
        },
        (error) => {
          dispatch({ type: LOGOUT_FAILURE, error: parseError(error) });
        },
      );
  };
}

export function clearErrors() {
  return { type: CLEAR_ERRORS };
}
