// @ts-check

/* global HTMLElement */
/* global customElements */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Home
 */
export default class Home extends HTMLElement {
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
    this.loadChildComponents().then(() => (this.innerHTML = `
      <c-list-articles>
        <o-list-articles></o-list-articles>
      </c-list-articles>
    `))
  }

  /**
   * fetch when first needed
   *
   * @returns {Promise<void>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../controllers/ListArticles.js').then(module => ['c-list-articles', module.default]),
      import('../organisms/ListArticles.js').then(module => ['o-list-articles', module.default])
    ]).then(elements => elements.forEach(element => {
      // don't define already existing customElements
      // @ts-ignore
      if (!customElements.get(element[0])) customElements.define(...element)
    })))
  }
}
