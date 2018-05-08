import {dispatch, Events, onEvent, delay} from '../event-bus';
import API from '../api';
import Model from '../model';

onEvent (Events.LOGIN, user => {
  API.login (user.email, user.password)
    .catch (err => dispatch (Events.LOGIN_FAILED, err))
    .then (data => dispatch (Events.LOGIN_SUCCESS, data));
});

onEvent (Events.LOGIN_SUCCESS, user => {
  logger.log (user);
  const {email, password, bio, id, username, token} = user;
  Model.user = {
    email,
    password,
    bio,
    id,
    username,
  };
  dispatch (Events.NAVIGATE_HOME);
});

onEvent (Events.LOGIN_FAILED, () => {
  Model.user = undefined;
});

onEvent (Events.UPDATE_SETTINGS, user => {
  API.updateUser (user)
    .then (user => (Model.user = user))
    .then (() => dispatch (Events.UPDATE_SETTINGS_SUCCESS))
    .catch (err => dispatch (Events.UPDATE_SETTINGS_FAILED, err));
});

onEvent (Events.LOGOUT, () => {
  API.logout ();
  Model.user = undefined;
  dispatch (Events.INIT_APP);
});

onEvent (Events.INIT_APP, () => {
  API.autoLogin ()
    .then (user => {
      dispatch (Events.LOGIN_SUCCESS, user);
    })
    .catch (() => {
      Model.user = undefined;
      dispatch (Events.LOGIN_FAILED);
      dispatch (Events.NAVIGATE_HOME);
    })
    .finally (() => {
      delay().then(() => dispatch (Events.APP_READY))
    });
});
