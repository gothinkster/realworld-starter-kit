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
    // TODO: Split out the components and add functionality
    this.loadChildComponents().then(() => (this.innerHTML = `
      <c-list-articles>
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
                <div class="feed-toggle">
                  <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                      <a class="nav-link disabled" href="">Your Feed</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" href="">Global Feed</a>
                    </li>
                  </ul>
                </div>

                <o-list-article-previews><div class="article-preview">Loading...</div></o-list-article-previews>

              </div>

              <div class="col-md-3">
                <div class="sidebar">
                  <p>Popular Tags</p>

                  <div class="tag-list">
                    <a href="" class="tag-pill tag-default">programming</a>
                    <a href="" class="tag-pill tag-default">javascript</a>
                    <a href="" class="tag-pill tag-default">emberjs</a>
                    <a href="" class="tag-pill tag-default">angularjs</a>
                    <a href="" class="tag-pill tag-default">react</a>
                    <a href="" class="tag-pill tag-default">mean</a>
                    <a href="" class="tag-pill tag-default">node</a>
                    <a href="" class="tag-pill tag-default">rails</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
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
      import('../organisms/ListArticlePreviews.js').then(module => ['o-list-article-previews', module.default])
    ]).then(elements => elements.forEach(element => {
      // don't define already existing customElements
      // @ts-ignore
      if (!customElements.get(element[0])) customElements.define(...element)
    })))
  }
}
