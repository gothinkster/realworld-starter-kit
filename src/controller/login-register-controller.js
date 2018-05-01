import {dispatch, Events, onEvent} from '../event-bus'
import API from '../api'
import Model from '../model'
import UserStatus from '../user-status'

onEvent(Events.LOGIN, user => {
  API.login(user.email, user.password)
    .catch(err => dispatch(Events.LOGIN_FAILED, err))
    .then(data => dispatch(Events.LOGIN_SUCCESS, data))
})

onEvent(Events.LOGIN_SUCCESS, user => {
  console.log(user)
  const {email, password, bio, id, username, token} = user
  Model.user = {
    email,
    password,
    bio,
    id,
    username,
  }
  Model.userStatus = UserStatus.LOGGED_IN
  dispatch(Events.NAVIGATE_HOME)
})

onEvent(Events.LOGIN_FAILED, () => {
  Model.user = null
  Model.userStatus = UserStatus.LOGGED_OUT
})

onEvent(Events.UPDATE_SETTINGS, user => {
  API.updateUser(user)
    .then(user => (Model.user = user))
    .then(() => dispatch(Events.UPDATE_SETTINGS_SUCCESS))
    .catch(err => dispatch(Events.UPDATE_SETTINGS_FAILED, err))
})

onEvent(Events.LOGOUT, () => {
  API.logout()
  Model.user = null
  dispatch(Events.INIT_APP)
})

onEvent(Events.INIT_APP, () => {
  API.autoLogin()
    .then(user => {
      dispatch(Events.LOGIN_SUCCESS, user)
      dispatch(Events.APP_READY)
    })
    .catch(() => {
      Model.user = undefined
      Model.userStatus = UserStatus.LOGGED_OUT
      dispatch(Events.LOGIN_FAILED)
      dispatch(Events.NAVIGATE_HOME)
      dispatch(Events.APP_READY)
    })
})
