// @ts-check

/* global HTMLElement */
/* global customElements */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#article
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Article
 */
export default class Article extends HTMLElement {
  connectedCallback () {
    this.loadChildComponents()
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
    // TODO: Split out the components and add functionality
    this.innerHTML = `
      <c-favorite>
        <c-get-article>
          <m-article></m-article>
        </c-get-article>
      </c-favorite>
    `
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../controllers/Favorite.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['c-favorite', module.default]
      ),
      import('../controllers/GetArticle.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['c-get-article', module.default]
      ),
      import('../molecules/Article.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['m-article', module.default]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }
}
