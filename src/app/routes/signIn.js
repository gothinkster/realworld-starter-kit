import { render, html } from 'hybrids';
import { updateUsername, updatePassword, userLogin } from '../actions/signIn';
import { onInputAction, preventDefaultOn } from '../core/attributes';
import { connect } from '../core/store';

export default {
  signIn: connect(({ signIn }) => signIn),
  render: render(
    ({ signIn: { username, password, errors, logingIn } }) => html`
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              <ul class="error-messages">
                ${Object.keys(errors).length <= 0
                  ? ''
                  : Object.entries(errors).map(([key, value]) =>
                      value.map((error) => html` <li>${key} ${error}</li> `),
                    )}
              </ul>

              <form onsubmit="${preventDefaultOn(userLogin)}">
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    placeholder="Email"
                    oninput="${onInputAction(updateUsername)}"
                    value="${username}"
                    disabled="${logingIn}"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    oninput="${onInputAction(updatePassword)}"
                    value="${password}"
                    disabled="${logingIn}"
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" disabled="${logingIn}">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `,
    { shadowRoot: false },
  ),
};
