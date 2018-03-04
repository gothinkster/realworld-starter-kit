import { request } from '../agent';
import { parseError } from '../utils';

const ARTICLES_REQUEST = Symbol('ARTICLES_REQUEST');
const ARTICLES_SUCCESS = Symbol('ARTICLES_SUCCESS');
const ARTICLES_FAILURE = Symbol('ARTICLES_FAILURE');

const TAGS_REQUEST = Symbol('TAGS_REQUEST');
const TAGS_SUCCESS = Symbol('TAGS_SUCCESS');
const TAGS_FAILURE = Symbol('TAGS_FAILURE');

const ARTICLE_FAVORITE_REQUEST = Symbol('ARTICLES_ARTICLE_FAVORITE_REQUEST');
const ARTICLE_FAVORITE_SUCCESS = Symbol('ARTICLES_ARTICLE_FAVORITE_SUCCESS');
const ARTICLE_FAVORITE_FAILURE = Symbol('ARTICLES_ARTICLE_FAVORITE_FAIULURE');

const CLEAR_ERRORS = Symbol('ARTICLES_CLEAR_ERRORS');

const GLOBAL_FEED_COUNT = 10;
const PERSONAL_FEED_COUNT = 5;

const initialState = {
  articles: [],
  tags: [],
};

export default function articlesReduser(state = initialState, action) {
  switch (action.type) {
    case ARTICLES_SUCCESS:
      return {
        ...action.payload,
        tags: state.tags,
        pageLength: action.pageLength,
        page: action.page,
        filter: action.filter,
        value: action.value,
      };
    case ARTICLES_FAILURE:
      return { ...initialState, error: action.error };

    case TAGS_SUCCESS:
      return { ...state, tags: action.payload.tags };

    case ARTICLE_FAVORITE_SUCCESS:
      return {
        ...state,
        articles: state.articles.map(article => (
          article.slug === action.payload.article.slug
            ? action.payload.article
            : article
        )),
      };

    case CLEAR_ERRORS: // eslint-disable-line no-case-declarations
      const { error, ...nextState } = state;
      // eslint-disable-line no-case-declarations, no-unused-vars
      return nextState; // eslint-disable-line no-case-declarations

    default:
      return state;
  }
}

export function feed({ req, filter, value, page }) {
  let limit;
  let offset;
  if (!filter || filter === 'feed' || filter === 'tag') {
    limit = GLOBAL_FEED_COUNT;
  } else {
    limit = PERSONAL_FEED_COUNT;
  }
  if (!page) {
    offset = 0;
  } else {
    offset = (page - 1) * limit;
  }
  const params = { limit, offset };
  if (filter === 'author' || filter === 'favorited' || filter === 'tag') {
    params[filter] = decodeURIComponent(value);
  }

  return (dispatch) => {
    dispatch({ type: ARTICLES_REQUEST });

    return request(req, {
      method: 'get',
      url: filter === 'feed' ? '/articles/feed' : '/articles',
      params,
    }).then(
      response => dispatch({
        type: ARTICLES_SUCCESS,
        payload: response.data,
        pageLength: limit,
        page: page || 1,
        filter,
        value,
      }),
      error => dispatch({ type: ARTICLES_FAILURE, error: parseError(error) }),
    );
  };
}

export function tags({ req }) {
  return (dispatch) => {
    dispatch({ type: TAGS_REQUEST });

    return request(req, {
      method: 'get',
      url: '/tags',
    }).then(
      response => dispatch({ type: TAGS_SUCCESS, payload: response.data }),
      error => dispatch({ type: TAGS_FAILURE, error: parseError(error) }),
    );
  };
}

export function favorite({ slug, method }) {
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
