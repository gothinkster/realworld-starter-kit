import Bus, {dispatch, Events} from '../event-bus';
import API from '../api';
import Router from '../router/router';
import Model from '../model';

Bus.on(Events.LOGIN, e => {
  const {target: user} = e;
  API.login(user.email, user.password)
    .catch(err => dispatch(Events.LOGIN_FAILED, err))
    .then(data => dispatch(Events.LOGIN_SUCCESS, data));
});

Bus.on(Events.LOGIN_SUCCESS, event => {
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

Bus.on(Events.LOGIN_FAILED, () => {
  Model.user = null;
});

Bus.on(Events.UPDATE_SETTINGS, ({target: user}) => {
  API.updateUser(user)
    .then(({user}) => (Model.user = user))
    .then(() => dispatch(Events.UPDATE_SETTINGS_SUCCESS))
    .catch(err => dispatch(Events.UPDATE_SETTINGS_FAILED, err));
});

Bus.on(Events.LOGOUT, () => {
  Model.user = null;
  API.logout();
  dispatch(Events.INIT_APP);
});

Bus.on(Events.INIT_APP, () => {
  API.autoLogin()
    .then(({user}) => (Model.user = user))
    .catch(() => {
      Model.user = null;
      dispatch(Events.NAVIGATE_HOME);
    })
    .finally(() => dispatch(Events.APP_READY));
});

// Automatic login on startup
dispatch(Events.INIT_APP);
