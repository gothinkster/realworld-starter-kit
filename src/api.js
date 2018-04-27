import _agent from 'superagent';
import CONFIG from '../config';
import {dispatch, Events} from './event-bus';

const {endpoint: API_ROOT, articlesPerPage} = CONFIG;
const agent = {
  get: function() {
    openPopup();
    return _agent
      .get(...arguments)
      .use(useToken)
      .then(closePopup)
      .catch(err => closePopup(err, true));
  },
  post: function() {
    openPopup();
    return _agent
      .post(...arguments)
      .use(useToken)
      .then(closePopup)
      .catch(err => closePopup(err, true));
  },
  put: function() {
    openPopup();
    return _agent
      .put(...arguments)
      .use(useToken)
      .then(closePopup)
      .catch(err => closePopup(err, true));
  },
  del: function() {
    openPopup();
    return _agent
      .del(...arguments)
      .use(useToken)
      .then(closePopup)
      .catch(err => closePopup(err, true));
  },
};

const useToken = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const openPopup = () => {
  dispatch(Events.OPEN_MODAL, 'Loading data...');
};

const closePopup = (resolution, isError = false) => {
  dispatch(Events.CLOSE_MODAL);
  if (isError) {
    throw resolution;
  }
  return Promise.resolve(resolution);
};

let token = window.localStorage.getItem('jwt');

const parseBody = res => res.body;

const get = url => agent.get(`${API_ROOT}${url}`).then(parseBody);

const post = (url, body) =>
  agent.post(`${API_ROOT}${url}`, body).then(parseBody);

const put = (url, body) => agent.put(`${API_ROOT}${url}`, body).then(parseBody);

const del = url => agent.del(`${API_ROOT}${url}`).then(parseBody);

export default class API {
  static register(username, email, password) {
    const data = {
      user: {
        username,
        email,
        password,
      },
    };
    return post('/users', data);
  }

  static autoLogin() {
    if (!token) {
      return Promise.reject();
    }
    return get(`/user`);
  }

  static logout() {
    window.localStorage.removeItem('jwt');
    token = null;
  }

  static login(email, password) {
    const data = {
      user: {
        email,
        password,
      },
    };
    return post('/users/login', data)
      .catch(err => {
        window.localStorage.removeItem('jwt');
      })
      .then(body => {
        if (body.user && body.user.token) {
          token = body.user.token;
          window.localStorage.setItem('jwt', token);
        }
        return body;
      });
  }

  static updateUser(user) {
    return put('/user', {user});
  }

  // PROFILE
  static getProfile(username) {
    return get(`/profiles/${username}`);
  }

  static follow(username) {
    return post(`/profiles/${username}/follow`);
  }

  static unfollow(username) {
    return del(`/profiles/${username}/follow`);
  }

  // TAGS

  static getAllTags() {
    return get('/tags');
  }

  // ARTICLES

  static getArticles(username = undefined, offset = 0) {
    const authorParam = username ? `?author=${username}&` : '?';
    const otherParams = `limit=${articlesPerPage}&offset=${offset}`;
    return get(`/articles${authorParam}${otherParams}`);
  }

  static getFavArticles(username = undefined, offset = 0) {
    const authorParam = username ? `?favorited=${username}&` : '?';
    const otherParams = `limit=${articlesPerPage}&offset=${offset}`;
    return get(`/articles${authorParam}${otherParams}`);
  }
}
