// @ts-check

/* global HTMLElement */
/* global CustomEvent */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#ListArticles
 * As an organism, this component shall hold molecules and/or atoms
 * this organism always renders new when connected to keep most recent and does not need shouldComponentRender
 *
 * @export
 * @class ListArticlePreviews
 */
export default class ListArticlePreviews extends HTMLElement {
  constructor () {
    super()

    /**
     * Listens to the event name/typeArg: 'listArticles'
     *
     * @param {CustomEvent & {detail: import("../controllers/ListArticles.js").ListArticlesEventDetail}} event
     */
    this.listArticlesListener = event => this.render(event.detail.fetch)
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
   * @param {Promise<import("../../helpers/Interfaces.js").MultipleArticles>} fetchMultipleArticles
   * @return {void}
   */
  render (fetchMultipleArticles) {
    fetchMultipleArticles.then(multipleArticles => {
      // TODO:
      // behavior button favoritesCount to own atom
      // TODO: ↑↑↑
      if (!multipleArticles.articles || !multipleArticles.articles.length) {
        this.innerHTML = '<div class="article-preview">No articles are here... yet.</div>'
      } else {
        this.innerHTML = ''
        multipleArticles.articles.forEach(article => {
          const articlePreview = document.createElement('div')
          articlePreview.classList.add('article-preview')
          articlePreview.innerHTML = `
            <div class="article-meta">
              <a href="#/profile/${article.author.username}"><img src="${article.author.image}" /></a>
              <div class="info">
                <a href="#/profile/${article.author.username}" class="author">${article.author.username}</a>
                <span class="date">${new Date(article.createdAt).toDateString()}</span>
              </div>
              <button class="btn ${article.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right">
                <i class="ion-heart"></i> ${article.favoritesCount}
              </button>
            </div>
            <a href="#/article/${article.slug}" class="preview-link">
              <h1>${article.title}</h1>
              <p>${article.description}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                ${article.tagList.reduce((tagListStr, tag) => (tagListStr += `
                  <li class="tag-default tag-pill tag-outline">${tag}</li>
                `), '')}
              </ul>
            </a>
          `
          this.appendChild(articlePreview)
        })
      }
    })
  }
}
