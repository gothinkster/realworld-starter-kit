import {template, tag} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import API from '../api'

@tag('register-page')
@template(/*html*/ `
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <a href="#/login">Have an account?</a>
        </p>

        <ul s:if="emailAlreadyTaken" class="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form submit="handleSubmit">
          <fieldset class="form-group">
            <input s:id="username" class="form-control form-control-lg" type="text" placeholder="Username">
          </fieldset>
          <fieldset class="form-group">
            <input s:id="email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input s:id="password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
`)
export default class Register extends Slim {
  handleSubmit(e) {
    e.preventDefault()
    Promise.resolve()
      .then(() => {
        this.email.disabled = true
        this.password.disabled = true
      })
      .then(() =>
        API.register(this.username.value, this.email.value, this.password.value)
      )
      .then(() => alert('ok'))
      .catch(() => alert('error'))
  }
}
