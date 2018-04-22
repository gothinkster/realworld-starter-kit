import Bus, {dispatch} from '../event-bus';
import API from '../api';
import Router from '../router/router';
import Model from '../model';

Bus.on('login', e => {
  const {target: user} = e;
  API.login(user.email, user.password)
    .catch(err => dispatch('login-failed', err))
    .then(data => dispatch('login-success', data));
});

Bus.on('login-success', event => {
  const {email, password, bio, id, username, token} = event.target.user;
  Model.user = {
    email,
    password,
    bio,
    id,
    username,
  };
  Router.navigate('/');
});

Bus.on('login-failed', () => {
  Model.user = null;
});

Router.navigate('/');
