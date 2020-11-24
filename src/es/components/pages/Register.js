// @ts-check

/* global HTMLElement */
/* global customElements */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Login
 */
export default class Login extends HTMLElement {
  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
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
    this.innerHTML = `
      <div class="auth-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              <ul class="error-messages">
                <li>That email is already taken</li>
              </ul>

              <form>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password">
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
}
