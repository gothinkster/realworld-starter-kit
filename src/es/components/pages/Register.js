// @ts-check

/* global HTMLElement */
/* global customElements */
/* global fetch */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Login
 */
export default class Register extends HTMLElement {
  constructor() {
    super()

    this.submitListener = (e) => {
      if(this.registerForm.checkValidity()) {
        e.preventDefault();

        const url = `${Environment.fetchBaseUrl}users`
        const body = {
          'user': {
            'username': this.userField.value,
            'email': this.emailField.value,
            'password': this.passwordField.value
          }
        }

        fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((response) => response.json())
        .then(data => {
          if (data.errors) return this.errorMessages = data.errors;

          // TODO: store token and redirect
          console.log(data)
          // Environment.token = data.token
          // window.location.href = '#/'
        })
        .catch((error) => console.error('Error:', error))
      }

    }
  }

  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
    this.registerForm.addEventListener('submit', this.submitListener)
  }

  disconnectedCallback () {
    this.registerForm.removeEventListener('submit', this.submitListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRender () {
    return !this.innerHTML
  }

  /**
   * renders the footer
   *
   * @return {void}
   */
  render () {
    this.innerHTML = /* html */`
      <div class="auth-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <a href="#/login">Have an account?</a>
              </p>

              <ul class="error-messages">
                <li>That email is already taken</li>
              </ul>

              <form>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" name="username" placeholder="Your Name" required>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="email" name="email" placeholder="Email" required>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" name="password" placeholder="Password" required>
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Sign up
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    `
  }

  get registerForm() {
    return this.querySelector('form')
  }

  /**
   * @return {HTMLInputElement}
   */
  get userField() {
    return this.querySelector('input[name="username"]')
  }

  /**
   * @return {HTMLInputElement}
   */
  get emailField() {
    return this.querySelector('input[name="email"]')
  }

  /**
   * @return {HTMLInputElement}
   */
  get passwordField() {
    return document.querySelector('input[name="password"]')
  }

  get errorMessages() {
    return this.querySelector('.error-messages')
  }

  set errorMessages(value) {
    console.log('val', value)
  }
}
