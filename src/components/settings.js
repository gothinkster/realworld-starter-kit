import {template} from 'slim-js/Decorators';
import {Slim} from 'slim-js';
import {dispatch} from '../event-bus';
import Model from '../model';

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
                  bind:value="model.user.image">
              </fieldset>
              <fieldset class="form-group">
                <input s:id="username" class="form-control form-control-lg" type="text"
                  name="username"
                  bind:value="model.user.username"
                  placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea s:id="userBio" class="form-control form-control-lg" rows="8"
                  name="userBio"
                  bind:value="model.user.bio"
                  placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input s:id="email" class="form-control form-control-lg" type="text"
                  name="email"
                  bind:value="model.user.email"
                  placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input s:id="password" class="form-control form-control-lg" type="password" name="password" placeholder="New Password">
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
  email;
  password;
  username;
  userBio;
  profilePicture;
  controls;
  settingsForm;

  constructor() {
    super();
    this.model = Model;
  }

  onAdded() {
    if (!Model.user) {
      dispatch('go-home');
    }
  }

  setControlsEnabled(value) {
    for (let control of this.settingsForm.elements) {
      control.disabled = !value;
    }
  }

  onUpdateSettingsError() {}

  onSubmit(e) {
    e.preventDefault();
    this.setControlsEnabled(false);
    const payload = {
      bio: this.userBio.value,
      image: this.profilePicture.value,
      email: this.email.value,
    };

    if (this.password.value) {
      payload.password = this.password.value;
    }

    dispatch('update-settings', payload);
  }

  onLogout() {
    dispatch('logout');
  }
}
