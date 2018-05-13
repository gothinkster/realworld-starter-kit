import {template, tag} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import {dispatch, Events} from '../event-bus'
import bindable from '../decorators/bindable';

@tag('settings-page')
@template(/*html*/ `
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form s:id="settingsForm" submit="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input s:id="profilePicture" class="form-control" type="text"
                  name="profilePicture"
                  placeholder="URL of profile picture"
                  bind:value="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input s:id="username" class="form-control form-control-lg" type="text"
                  name="username"
                  bind:value="user.username"
                  placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea s:id="userBio" class="form-control form-control-lg" rows="8"
                  name="userBio"
                  bind:value="user.bio"
                  placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input s:id="email" class="form-control form-control-lg" type="text"
                  name="email"
                  bind:value="user.email"
                  placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input s:id="password" class="form-control form-control-lg" type="password" name="password" placeholder="Change Password">
              </fieldset>
              <button s:id="submitBtn" click="onSubmit" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr/>
        <button s:id="logoutBtn" click="onLogout" class="btn btn-outline-danger">Or click here to logout.</button>
      </div>

    </div>
  </div>
</div>
`)
export default class Settings extends Slim {
  email
  password
  username
  userBio
  profilePicture
  controls
  settingsForm
  @bindable('user') user

  constructor() {
    super()
  }

  onCreated() {
    if (!this.user) {
      dispatch(Events.NAVIGATE_HOME)
    }
  }

  setControlsEnabled(value) {
    for (let control of this.settingsForm.elements) {
      control.disabled = !value
    }
  }

  onUpdateSettingsError() {}

  onSubmit(e) {
    e.preventDefault()
    this.setControlsEnabled(false)
    const payload = {
      bio: this.userBio.value,
      image: this.profilePicture.value,
      email: this.email.value,
    }

    if (this.password.value) {
      payload.password = this.password.value
    }

    dispatch('update-settings', payload)
  }

  onLogout() {
    dispatch('logout')
  }
}
