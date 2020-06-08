// @ts-check

import { MasterShadow } from '../prototypes/MasterShadow.js'

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 */
export default class Header extends MasterShadow() {
  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRender () {
    return !this.html
  }

  /**
   * renders the header within the body, which is in this case the navbar
   *
   * @return {void}
   */
  render() {
    this.html = `
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html">conduit</a>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <a class="nav-link active" href="">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <i class="ion-compose"></i>&nbsp;New Post
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
    `
  }
}
