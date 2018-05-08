import {template, tag} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import {dispatch, offEvent, onEvent} from '../event-bus'

@tag('login-page')
@template(/*html*/ `
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign in</h1>
        <p class="text-xs-center">
          <a href="#/register">Need an account?</a>
        </p>

        <ul s:if="isLoginFailed" class="error-messages">
          <li>email or password is invalid</li>
        </ul>

        <form submit="handleSubmit">
          <fieldset class="form-group">
            <input s:id="email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input s:id="password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button s:id="submitBtn" class="btn btn-lg btn-primary pull-xs-right">
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
`)
export default class Login extends Slim {
  isLoginFailed = false

  constructor() {
    super()
  }

  initialize() {
    this._onLoginFailed = this.onLoginFailed.bind(this)
    this._onLoginSuccess = this.onLoginSuccess.bind(this)
    this.isLoginFailed = false
    onEvent('login-failed', this._onLoginFailed)
    onEvent('login-success', this._onLoginSuccess)
    this.password.value = 'test1234'
    this.email.value = 'eavichay@gmail.com'
  }

  setControlsEnabled(value) {
    this.password.disabled = this.email.disabled = this.submitBtn.disabled = !value
  }

  onRender() {
    this.initialize()
  }

  onRemoved() {
    offEvent('login-failed', this._onLoginFailed)
    offEvent('login-success', this._onLoginSuccess)
  }

  onLoginFailed(errorEvent) {
    this.isLoginFailed = true
    this.setControlsEnabled(true)
  }

  onLoginSuccess(data) {}

  handleSubmit(e) {
    e.preventDefault()
    this.setControlsEnabled(false)
    dispatch('login', {
      email: this.email.value,
      password: this.password.value,
    })
  }
}
