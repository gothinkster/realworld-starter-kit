import { request } from '../agent';
import { parseError } from '../utils';

const ARTICLE_REQUEST = Symbol('ARTICLE_REQUEST');
const ARTICLE_SUCCESS = Symbol('ARTICLE_SUCCESS');
const ARTICLE_FAILURE = Symbol('ARTICLE_FAILURE');

const ARTICLE_SAVE_REQUEST = Symbol('ARTICLE_SAVE_REQUEST');
const ARTICLE_SAVE_SUCCESS = Symbol('ARTICLE_SAVE_SUCCESS');
const ARTICLE_SAVE_FAILURE = Symbol('ARTICLE_SAVE_FAILURE');

const ARTICLE_DELETE_REQUEST = Symbol('ARTICLE_DELETE_REQUEST');
const ARTICLE_DELETE_SUCCESS = Symbol('ARTICLE_DELETE_SUCCESS');
const ARTICLE_DELETE_FAILURE = Symbol('ARTICLE_DELETE_FAILURE');

const ARTICLE_COMMENTS_REQUEST = Symbol('ARTICLE_COMMENTS_REQUEST');
const ARTICLE_COMMENTS_SUCCESS = Symbol('ARTICLE_COMMENTS_SUCCESS');
const ARTICLE_COMMENTS_FAILURE = Symbol('ARTICLE_COMMENTS_FAIULURE');

const ARTICLE_FOLLOW_REQUEST = Symbol('ARTICLE_FOLLOW_REQUEST');
const ARTICLE_FOLLOW_SUCCESS = Symbol('ARTICLE_FOLLOW_SUCCESS');
const ARTICLE_FOLLOW_FAILURE = Symbol('ARTICLE_FOLLOW_FAILURE');

const ARTICLE_FAVORITE_REQUEST = Symbol('ARTICLE_FAVORITE_REQUEST');
const ARTICLE_FAVORITE_SUCCESS = Symbol('ARTICLE_FAVORITE_SUCCESS');
const ARTICLE_FAVORITE_FAILURE = Symbol('ARTICLE_FAVORITE_FAIULURE');

const ARTICLE_COMMENT_REQUEST = Symbol('ARTICLE_COMMENT_REQUEST');
const ARTICLE_COMMENT_SUCCESS = Symbol('ARTICLE_COMMENT_SUCCESS');
const ARTICLE_COMMENT_FAILURE = Symbol('ARTICLE_COMMENT_FAIULURE');

const ARTICLE_COMMENT_DELETE_REQUEST = Symbol('ARTICLE_COMMENT_DELETE_REQUEST');
const ARTICLE_COMMENT_DELETE_SUCCESS = Symbol('ARTICLE_COMMENT_DELETE_SUCCESS');
const ARTICLE_COMMENT_DELETE_FAILURE = Symbol('ARTICLE_COMMENT_DELETE_FAIULURE');

const CLEAR_ERRORS = Symbol('ARTICLE_CLEAR_ERRORS');


const initialState = {
  article: { author: {}, tagList: [] },
  comments: [],
};

export default function articleReduser(state = initialState, action) {
  let error; // eslint-disable-line no-unused-vars
  let rest;
  switch (action.type) {
    case ARTICLE_SUCCESS:
      ({ error, ...rest } = state);
      return { ...rest, article: action.payload.article };
    case ARTICLE_FAILURE:
      return { ...state, error: action.error };

    case ARTICLE_SAVE_REQUEST:
      ({ error, ...rest } = state);
      return { ...rest, transition: true };
    case ARTICLE_SAVE_SUCCESS:
      ({ error, ...rest } = state);
      return { ...rest, article: action.payload.article, transition: false };
    case ARTICLE_SAVE_FAILURE:
      return { ...state, error: action.error, transition: false };

    case ARTICLE_DELETE_REQUEST:
      ({ error, ...rest } = state);
      return { ...rest, transition: true };
    case ARTICLE_DELETE_SUCCESS:
      ({ error, ...rest } = state);
      return { ...rest, transition: false };
    case ARTICLE_DELETE_FAILURE:
      return { ...state, error: action.error, transition: false };

    case ARTICLE_COMMENTS_SUCCESS:
      ({ error, ...rest } = state);
      return { ...rest, comments: action.payload.comments };
    case ARTICLE_COMMENTS_FAILURE:
      return { ...state, error: action.error };

    case ARTICLE_COMMENT_SUCCESS:
      ({ error, ...rest } = state);
      rest.comments.unshift(action.payload.comment);
      return rest;
    case ARTICLE_COMMENT_FAILURE:
      return { ...state, error: action.error };

    case ARTICLE_COMMENT_DELETE_SUCCESS: // eslint-disable-line no-case-declarations
      ({ error, ...rest } = state);
      const comments = rest.comments.filter(comment => comment.id !== action.payload.id); // eslint-disable-line no-shadow, max-len
      return { ...rest, comments };
    case ARTICLE_COMMENT_DELETE_FAILURE:
      return { ...state, error: action.error };

    case ARTICLE_FOLLOW_SUCCESS:
      ({ error, ...rest } = state);
      return { ...rest, ...{ article: { ...rest.article, author: action.payload.profile } } };

    case ARTICLE_FAVORITE_SUCCESS:
      ({ error, ...rest } = state);
      return { ...rest, article: action.payload.article };

    case CLEAR_ERRORS: // eslint-disable-line no-case-declarations
      ({ error, ...rest } = state);
      // eslint-disable-line no-case-declarations, no-unused-vars
      return rest; // eslint-disable-line no-case-declarations

    default:
      return state;
  }
}

export function article({ req, slug }) {
  return (dispatch) => {
    dispatch({ type: ARTICLE_REQUEST });
    return request(req, {
      method: 'get',
      url: `/articles/${slug}`,
    }).then(
      response => dispatch({ type: ARTICLE_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_FAILURE, error: parseError(error) }),
    );
  };
}

export function saveArticle(article) { // eslint-disable-line no-shadow
  const { slug } = article;
  const data = { article };
  return (dispatch) => {
    dispatch({ type: ARTICLE_SAVE_REQUEST });
    return request(undefined, {
      method: slug ? 'put' : 'post',
      url: slug ? `/articles/${slug}` : '/articles',
      data,
    }).then(
      response => dispatch({ type: ARTICLE_SAVE_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_SAVE_FAILURE, error: parseError(error) }),
    );
  };
}

export function deleteArticle(article) { // eslint-disable-line no-shadow
  const { slug } = article;
  return (dispatch) => {
    dispatch({ type: ARTICLE_DELETE_REQUEST });
    return request(undefined, {
      method: 'delete',
      url: `/articles/${slug}`,
    }).then(
      () => dispatch({ type: ARTICLE_DELETE_SUCCESS }),
      error => dispatch({ type: ARTICLE_DELETE_FAILURE, error: parseError(error) }),
    );
  };
}

export function comments({ req, slug }) {
  return (dispatch) => {
    dispatch({ type: ARTICLE_COMMENTS_REQUEST });
    return request(req, {
      method: 'get',
      url: `/articles/${slug}/comments`,
    }).then(
      response => dispatch({ type: ARTICLE_COMMENTS_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_COMMENTS_FAILURE, error: parseError(error) }),
    );
  };
}

export function addComment({ slug, body }) {
  return (dispatch) => {
    dispatch({ type: ARTICLE_COMMENT_REQUEST });
    return request(undefined, {
      method: 'post',
      url: `/articles/${slug}/comments`,
      data: { comment: { body } },
    }).then(
      response => dispatch({ type: ARTICLE_COMMENT_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_COMMENT_FAILURE, error: parseError(error) }),
    );
  };
}

export function deleteComment({ slug, id }) {
  return (dispatch) => {
    dispatch({ type: ARTICLE_COMMENT_DELETE_REQUEST });
    return request(undefined, {
      method: 'delete',
      url: `/articles/${slug}/comments/${id}`,
    }).then(
      () => dispatch({ type: ARTICLE_COMMENT_DELETE_SUCCESS, payload: { id } }),
      error => dispatch({ type: ARTICLE_COMMENT_DELETE_FAILURE, error: parseError(error) }),
    );
  };
}

export function follow({ author, method }) {
  if (method !== 'post' && method !== 'delete') {
    return { type: ARTICLE_FOLLOW_FAILURE, error: { message: 'Only post or delete methos alowed' } };
  }

  return (dispatch) => {
    dispatch({ type: ARTICLE_FOLLOW_REQUEST });

    return request(undefined, {
      method,
      url: `/profiles/${author}/follow`,
    }).then(
      response => dispatch({ type: ARTICLE_FOLLOW_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_FOLLOW_FAILURE, error: parseError(error) }),
    );
  };
}

export function favorite({ slug, method }) {
  if (method !== 'post' && method !== 'delete') {
    return { type: ARTICLE_FAVORITE_FAILURE, error: { message: 'usernameOnly post or delete methos alowed' } };
  }

  return (dispatch) => {
    dispatch({ type: ARTICLE_FAVORITE_REQUEST });

    return request(undefined, {
      method,
      url: `/articles/${slug}/favorite`,
    }).then(
      response => dispatch({ type: ARTICLE_FAVORITE_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_FAVORITE_FAILURE, error: parseError(error) }),
    );
  };
}

export function clearErrors() {
  return { type: CLEAR_ERRORS };
}
