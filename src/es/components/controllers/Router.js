// @ts-check
/** @typedef {{ name: string, path: string, regExp: RegExp, component?: HTMLElement }} route */

/* global self */

/**
 * As a controller, this component becomes a router
 *
 * @export
 * @class Router
 */
export default class Router extends HTMLElement {
  constructor () {
    super()

    /** @type {route[]} */
    this.routes = [
      // Home page (URL: /#/ ) 
      {
        name: 'p-home',
        path: '../pages/Home.js',
        regExp: new RegExp(/^#\/$/),
      },
      // Sign in/Sign up pages (URL: /#/login, /#/register ) 
      {
        name: 'p-login',
        path: '',
        regExp: new RegExp(/^#\/login/)
      },
      {
        name: 'p-register',
        path: '',
        regExp: new RegExp(/^#\/register/)
      },
      // Settings page (URL: /#/settings )
      {
        name: 'p-settings',
        path: '',
        regExp: new RegExp(/^#\/settings/)
      },
      // Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
      {
        name: 'p-editor',
        path: '',
        regExp: new RegExp(/^#\/editor/)
      },
      // Article page (URL: /#/article/article-slug-here )
      {
        name: 'p-article',
        path: '../pages/Article.js',
        regExp: new RegExp(/^#\/article/)
      },
      // Profile page (URL: /#/profile/:username, /#/profile/:username/favorites ) 
      {
        name: 'p-profile',
        path: '',
        regExp: new RegExp(/^#\/profile/)
      }
    ]
  }

  connectedCallback () {
    self.addEventListener('hashchange', () => this.route(location.hash))
    this.route(this.routes.some(route => route.regExp.test(location.hash)) ? location.hash : '#/')
  }

  /**
   * route to the desired hash/domain
   *
   * @param {string} hash
   * @return {void | string}
   */
  route(hash) {
    // escape on route call which is not set by hashchange event and trigger it here, if needed
    if (location.hash !== hash) return (location.hash = hash)
    let route
    // find the correct route or do nothing
    if ((route = this.routes.find(route => route.regExp.test(hash)))) {
      // reuse route.component, if already set, otherwise import and define custom element
      // @ts-ignore
      const componentPromise = !!route.component ? Promise.resolve(route.component) : import(route.path).then(module => {
        customElements.define(route.name, module.default)
        // save it to route object for reuse
        return (route.component = document.createElement(route.name))
      })
      componentPromise.then(component => {
        if (this.shouldComponentRender(component)) this.render(component)
      })
    }
  }

  /**
   * evaluates if a render is necessary
   *
   * @param {HTMLElement} component
   * @return {boolean}
   */
  shouldComponentRender (component) {
    return !this.contains(component)
  }

  /**
   * renders the page
   *
   * @param {HTMLElement} component
   * @return {void}
   */
  render(component) {
    // clear previous content
    this.innerHTML = ''
    this.appendChild(component)
  }
}
