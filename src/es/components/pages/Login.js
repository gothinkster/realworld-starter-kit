// @ts-check

/* global CustomEvent */
/* global HTMLElement */
/* global self */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Login
 */
export default class Login extends HTMLElement {
  constructor () {
    super()

    this.submitListener = event => {
      event.preventDefault()

      this.dispatchEvent(new CustomEvent('loginUser', {
        detail: {
          /** @type {import("../../helpers/Interfaces.js").Authentication} */
          user: {
            email: this.emailField.value,
            password: this.passwordField.value
          }
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /**
     * Listens to the event name/typeArg: 'article'
     *
     * @param {CustomEvent & {detail: import("../controllers/User.js").UserEventDetail}} event
     */
    this.userListener = event => {
      event.detail.fetch.then(user => (self.location.hash = '#/')).catch(error => (this.errorMessages = error))
    }
  }

  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
    this.querySelector('form').addEventListener('submit', this.submitListener)
    document.body.addEventListener('user', this.userListener)
  }

  disconnectedCallback () {
    this.querySelector('form').removeEventListener('submit', this.submitListener)
    document.body.removeEventListener('user', this.userListener)
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
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <a href="#/register">Need an account?</a>
              </p>

              <ul class="error-messages"></ul>

              <form id="login-form">
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="email" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    `
  }

  /**
   * @return {HTMLInputElement}
   *
   */
  get passwordField () {
    return document.querySelector('input[type=password]')
  }

  /**
   * @return {HTMLInputElement}
   *
   */
  get emailField () {
    return document.querySelector('input[type=email]')
  }

  get errorMessages () {
    return this.querySelector('.error-messages')
  }

  set errorMessages (errors) {
    const ul = this.querySelector('.error-messages')
    if (ul && typeof errors === 'object') {
      ul.innerHTML = ''
      for (const key in errors) {
        const li = document.createElement('li')
        li.textContent = `${key}: ${errors[key].reduce((acc, curr) => `${acc}${acc ? ' | ' : ''}${curr}`, '')}`
        ul.appendChild(li)
      }
    }
  }
}
