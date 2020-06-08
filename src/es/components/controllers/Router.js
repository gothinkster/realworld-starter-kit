// @ts-check

/* global self */

import { MasterShadow } from '../prototypes/MasterShadow.js'

/**
 * As a router, this component becomes a domain controller
 * this style and html should be set at its parent index.html, for immediate visual feedback
 *
 * @export
 * @class Router
 */
export default class Router extends MasterShadow() {
  constructor (...args) {
    super(...args)

    // TODO: add named regex es6 stuff and check for regex at route
    /** @type {RegExp[]} */
    this.routes = [
      // Home page (URL: /#/ ) 
      new RegExp(/^#\/$/),
      // Sign in/Sign up pages (URL: /#/login, /#/register ) 
      new RegExp(/^#\/login$/),
      new RegExp(/^#\/register$/),
      // Settings page (URL: /#/settings )
      new RegExp(/^#\/settings$/),
      // Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
      new RegExp(/^#\/editor\/([a-zA-Z0-9]*?)$/),
      // Article page (URL: /#/article/article-slug-here ) 
      new RegExp(/^#\/article\/([a-zA-Z0-9]*?)$/),
      // Profile page (URL: /#/profile/:username, /#/profile/:username/favorites ) 
      new RegExp(/^#\/profile\/([a-zA-Z0-9]*?)$/),
      new RegExp(/^#\/profile\/([a-zA-Z0-9]*?)\/favorites$/)
    ]
  }

  connectedCallback () {
    self.addEventListener('hashchange', () => this.route(location.hash))
    this.route('#/')
  }

  /**
   * route to the desired hash/domain
   *
   * @param {string} hash
   * @return {boolean}
   */
  route(hash) {
    if (location.hash !== hash) {
      location.hash = hash
      return true
    }
    return false
  }
}
