// @ts-check

/* global HTMLElement */
/* global customElements */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Register
 */
export default class Register extends HTMLElement {
  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
    this.getElementsByTagName("form")[0].addEventListener('submit', this.submitListener);
  }

  submitListener () {
    // @ts-ignore
    const password = document.getElementById("password").value
    // @ts-ignore
    const email = document.getElementById("email").value
    const url = `${Environment.fetchBaseUrl}users/login`
 
    const body = {
      'user': {
        'email': email,
        'password': password
      }
    }

    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then( (response) => {
      return response.json()
    }).then ( (data) => {
      // tbd store Token and redirect
      console.log(data);
    })
    

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

              <ul class="error-messages">
                <li>That email is already taken</li>
              </ul>

              <form id="login-form">
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" id="email" type="email" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" id="password" type="password" placeholder="Password">
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
}
