import { render, html } from 'hybrids';
import store from '../store';
import { onInputAction, preventDefaultOn } from '../core/attributes';
import {
  updatePassword,
  updateImage,
  updateBio,
  updateEmail,
  updateSettings,
} from '../actions/settings';
import { updateUsername } from '../actions/signIn';
import { logout } from '../actions/app';

const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (_, __, invalidate) => store.subscribe(invalidate),
});

export default {
  settings: connect(store, ({ settings }) => settings),
  render: render(
    ({
      settings: {
        user: { username, bio, image, email },
        password,
        updatingSettings,
      },
    }) => html`
      <div class="settings-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>

              <form onsubmit="${preventDefaultOn(updateSettings)}">
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      value="${image}"
                      oninput="${onInputAction(updateImage)}"
                      disabled="${updatingSettings}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value="${username}"
                      oninput="${onInputAction(updateUsername)}"
                      disabled="${updatingSettings}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      class="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      value="${bio}"
                      oninput="${onInputAction(updateBio)}"
                      disabled="${updatingSettings}"
                    ></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value="${email}"
                      oninput="${onInputAction(updateEmail)}"
                      disabled="${updatingSettings}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value="${password}"
                      oninput="${onInputAction(updatePassword)}"
                      disabled="${updatingSettings}"
                    />
                  </fieldset>
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    disabled="${updatingSettings}"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button class="btn btn-outline-danger" onclick="${logout}">
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
    { shadowRoot: false },
  ),
};
