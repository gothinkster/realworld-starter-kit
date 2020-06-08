// @ts-check

import { MasterShadow } from '../prototypes/MasterShadow.js'

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 */
export default class Footer extends MasterShadow() {
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
   * renders the footer
   *
   * @return {void}
   */
  render() {
    this.html = `
      <footer>
        <div class="container">
          <a href="/" class="logo-font">conduit</a>
          <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    `
  }
}
