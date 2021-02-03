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
    this.innerHTML = `
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">

            <div class="col-md-9">
              <m-article-feed-toggle></m-article-feed-toggle>

              <o-list-article-previews><div class="article-preview">Loading...</div></o-list-article-previews>

              <m-pagination></m-pagination>

            </div>

            <div class="col-md-3">
              <aside class="sidebar">
                <p>Popular Tags</p>

                <c-get-tags>
                  <m-tag-list><div class="tag-list">Loading...</div></m-tag-list>
                </c-get-tags>
              </aside>
            </div>

          </div>
        </div>

      </div>
    `
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../controllers/GetTags.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['c-get-tags', module.default]
      ),
      import('../molecules/ArticleFeedToggle.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['m-article-feed-toggle', module.default]
      ),
      import('../organisms/ListArticlePreviews.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['o-list-article-previews', module.default]
      ),
      import('../molecules/TagList.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['m-tag-list', module.default]
      ),
      import('../molecules/Pagination.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['m-pagination', module.default]
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
