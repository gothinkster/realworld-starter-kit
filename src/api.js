import _agent from 'superagent';
import CONFIG from '../config';

const {endpoint: API_ROOT} = CONFIG;
const agent = _agent;

let token = window.localStorage.getItem('jwt');

const useToken = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const parseBody = res => res.body;

const get = url =>
  agent
    .get(`${API_ROOT}${url}`)
    .use(useToken)
    .then(parseBody);

const post = (url, body) =>
  agent
    .post(`${API_ROOT}${url}`, body)
    .use(useToken)
    .then(parseBody);

const put = (url, body) =>
  agent
    .put(`${API_ROOT}${url}`, body)
    .use(useToken)
    .then(parseBody);

const del = url =>
  agent
    .del(`${API_ROOT}${url}`)
    .use(useToken)
    .then(parseBody);

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
    return put('/users', {user});
  }

  static getAllTags() {
    return get('/tags');
  }
}
