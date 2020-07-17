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
      <c-get-article>
        <div class="article-page">

          <div class="banner">
            <div class="container">
        
              <h1>How to build webapps that scale</h1>
        
              <div class="article-meta">
                <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                <div class="info">
                  <a href="" class="author">Eric Simons</a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp;
                  Follow Eric Simons <span class="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button class="btn btn-sm btn-outline-primary">
                  <i class="ion-heart"></i>
                  &nbsp;
                  Favorite Post <span class="counter">(29)</span>
                </button>
              </div>
        
            </div>
          </div>
        
          <div class="container page">
        
            <div class="row article-content">
              <div class="col-md-12">
                <p>
                Web development technologies have evolved at an incredible clip over the past few years.
                </p>
                <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                <p>It's a great solution for learning how other frameworks work.</p>
              </div>
            </div>
        
            <hr />
        
            <div class="article-actions">
              <div class="article-meta">
                <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                <div class="info">
                  <a href="" class="author">Eric Simons</a>
                  <span class="date">January 20th</span>
                </div>
        
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp;
                  Follow Eric Simons <span class="counter">(10)</span>
                </button>
                &nbsp;
                <button class="btn btn-sm btn-outline-primary">
                  <i class="ion-heart"></i>
                  &nbsp;
                  Favorite Post <span class="counter">(29)</span>
                </button>
              </div>
            </div>
        
            <div class="row">
        
              <div class="col-xs-12 col-md-8 offset-md-2">
        
                <form class="card comment-form">
                  <div class="card-block">
                    <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                  </div>
                  <div class="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                    <button class="btn btn-sm btn-primary">
                    Post Comment
                    </button>
                  </div>
                </form>
                
                <div class="card">
                  <div class="card-block">
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div class="card-footer">
                    <a href="" class="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">Jacob Schmidt</a>
                    <span class="date-posted">Dec 29th</span>
                  </div>
                </div>
        
                <div class="card">
                  <div class="card-block">
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div class="card-footer">
                    <a href="" class="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">Jacob Schmidt</a>
                    <span class="date-posted">Dec 29th</span>
                    <span class="mod-options">
                      <i class="ion-edit"></i>
                      <i class="ion-trash-a"></i>
                    </span>
                  </div>
                </div>
                
              </div>
        
            </div>
        
          </div>
        
        </div>
      </c-get-article>
    `
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../controllers/GetArticle.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['c-get-article', module.default]
      )
      // import('../organisms/ListArticlePreviews.js').then(
      //   /** @returns {[string, CustomElementConstructor]} */
      //   module => ['o-list-article-previews', module.default]
      // )
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
