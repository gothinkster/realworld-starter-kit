// @ts-check

/* global HTMLElement */
/* global customElements */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Register
 */
export default class Register extends HTMLElement {
  constructor () {
    super()

    this.updateListener = event => {
      event.preventDefault()
      console.log(this.userField.value, this.emailField.value, this.passwordField.value, this.bioField.value, this.imageField.value);
      
      let user = {
        username: this.userField.value,
        email: this.emailField.value,
        bio: this.bioField.value,
        image: this.imageField.value
      }

      if (this.passwordField.value) Object.assign(user, {password: this.passwordField.value})
      
      console.log(user);

      this.dispatchEvent(new CustomEvent('updateUser', {
        detail: {
          /** @type {import("../../helpers/Interfaces.js").UpdateUser} */
          user: user
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.userListener = event => {
      event.detail.fetch.then(user => {
        this.userField.value = user.username
        this.emailField.value = user.email
        this.imageField.value = user.image
        this.bioField.value = user.bio
      }).catch((error) => console.log(error))
      
    }

  }

  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
    this.querySelector('button').addEventListener('click', this.updateListener)
    document.body.addEventListener('user', this.userListener)
    this.dispatchEvent(new CustomEvent('getUser', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
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
    <div class="settings-page">
      <div class="container page">
        <div class="row">
    
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>
    
            <form>
              <fieldset>
                  <fieldset class="form-group">
                    <input class="form-control" type="text" name="image" placeholder="URL of profile picture">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" name="username" placeholder="Your Name">
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea class="form-control form-control-lg" rows="8" name="bio" placeholder="Short bio about you"></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="email" name="email" placeholder="Email">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" name="password" placeholder="Password">
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
              </fieldset>
            </form>
          </div>
    
        </div>
      </div>
    </div>`
  }

 /**
   * @return {HTMLInputElement}
   */
  get userField () {
    return this.querySelector('input[name=username]')
  }

  /**
   * @return {HTMLInputElement}
   *
   */
  get emailField () {
    return document.querySelector('input[name=email]')
  }

  /**
   * @return {HTMLTextAreaElement}
   *
   */
  get bioField () {
    return document.querySelector('textarea[name=bio]')
  }

   /**
   * @return {HTMLInputElement}
   */
  get passwordField () {
    return document.querySelector('input[name=password]')
  }

  /**
   * @return {HTMLInputElement}
   *
   */
  get imageField () {
    return document.querySelector('input[name=image]')
  }
}