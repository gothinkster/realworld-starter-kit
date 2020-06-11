// @ts-check

/* global HTMLElement */
/* global CustomEvent */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#ListArticles
 * As an organism, this component shall hold molecules and/or atoms
 * this organism always renders new when connected to keep most recent and does not need shouldComponentRender
 *
 * @export
 * @class ListArticles
 */
export default class ListArticles extends HTMLElement {
  constructor () {
    super()

    /**
     * Listens to the event name/typeArg: 'listArticles'
     *
     * @param {CustomEvent & {detail: import("../controllers/ListArticles.js").ListArticlesEventDetail}} event
     */
    this.listArticlesListener = (event) => event.detail.fetch.then(multipleArticles => this.render(multipleArticles))
  }

  connectedCallback () {
    document.body.addEventListener('listArticles', this.listArticlesListener)
    // on every connect it will attempt to get newest articles
    this.dispatchEvent(new CustomEvent('requestListArticles', {
      /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('listArticles', this.listArticlesListener)
  }

  /**
   * renders the header within the body, which is in this case the navbar
   *
   * @param {import("../../helpers/Interfaces.js").MultipleArticles} multipleArticles
   * @return {void}
   */
  render (multipleArticles) {
    // TODO: Adjust if component is organism or molecule once its broken up!
    // Could also cycle through and only replace content of existing elements, consider this when doing sub components
    // behavior profile link
    // format date and check if cratedAt or updatedAt
    // behavior button favoritesCount
    // behavior preview-link
    // TODO: ↑↑↑
    this.innerHTML = ''
    multipleArticles.articles.forEach(article => {
      const articlePreview = document.createElement('div')
      articlePreview.classList.add('article-preview')
      articlePreview.innerHTML = `
        <div class="article-meta">
          <a href="profile.html"><img src="${article.author.image}" /></a>
          <div class="info">
            <a href="" class="author">${article.author.username}</a>
            <span class="date">${article.createdAt}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i> ${article.favoritesCount}
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>${article.title}</h1>
          <p>${article.description}</p>
          <span>Read more...</span>
        </a>
      `
      this.appendChild(articlePreview)
    })
  }
}
