// @ts-check

/* global CustomEvent */
/* global HTMLElement */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#header
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 */
export default class Header extends HTMLElement {
  constructor () {
    super()

    this.username = null
    /**
     * Listens to the event name/typeArg: 'getArticle'
     *
     * @param {CustomEvent & {detail: import("../controllers/User.js").UserEventDetail}} event
     */
    this.userListener = event => {
      event.detail.fetch.then(user => {
        if (this.shouldComponentRender(user.username)) this.render(user.username)
        this.username = user.username
      }).catch(error => {
        console.log(`Error@UserFetch: ${error}`)
        if (this.shouldComponentRender(null)) this.render(null)
        this.username = null
      })
    }
  }

  connectedCallback () {
    this.render()
    document.body.addEventListener('user', this.userListener)
    this.dispatchEvent(new CustomEvent('getUser', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('user', this.userListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @param {string} username
   * @return {boolean}
   */
  shouldComponentRender (username) {
    return this.username !== username
  }

  /**
   * renders the header within the body, which is in this case the navbar
   *
   * @param {string} [username = undefined]
   * @return {void}
   */
  render (username) {
    this.innerHTML = /* html */ `
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html">conduit</a>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <a class="nav-link active" href="#/">Home</a>
            </li>
            ${username ? /* html */ `
              <li class="nav-item">
                <a class="nav-link" href="#/editor">
                  <i class="ion-compose"></i>&nbsp;New Post
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/settings">
                  <i class="ion-gear-a"></i>&nbsp;Settings
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/profile/${username}">
                  ${username}
                </a>
              </li>`
              : /* html */ `
              <li class="nav-item">
                <a class="nav-link" href="#/login">Sign in</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/register">Sign up</a>
              </li>`
            }
          </ul>
        </div>
      </nav>
    `
  }
}
