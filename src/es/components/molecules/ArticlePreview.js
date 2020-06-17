// @ts-check

/* global HTMLElement */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class ArticlePreview
 */
export default class ArticlePreview extends HTMLElement {
  /**
   * customDefine
   *
   * @param {import("../../helpers/Interfaces.js").SingleArticle | null} [article = null]
   */
  constructor (article = null) {
    super()

    // allow innerHTML ArticlePreview with article as a string attribute
    this.article = article || JSON.parse((this.getAttribute('article') || '').replace(/'/g, '"') || '{}')
  }

  connectedCallback () {
    if (this.shouldComponentRender()) this.render(this.article)
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
   * renders the article
   *
   * @param {import("../../helpers/Interfaces.js").SingleArticle} [article = this.article]
   * @return {void | false}
   */
  render (article = this.article) {
    if (!article.author || !article.tagList) return false
    this.innerHTML = `
      <div class="article-preview">
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
      </div>
    `
    this.querySelector('button').addEventListener('click', event => {
      event.preventDefault()
      new Promise(resolve => {
        this.dispatchEvent(new CustomEvent('setFavorite', {
          /** @type {import("../controllers/Favorite.js").SetFavoriteEventDetail} */
          detail: {
            article,
            resolve
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }).then(
        /**
         * Updates the article with the returned article on favorite api
         * 
         * @param {import("../../helpers/Interfaces.js").SingleArticle} article
         * @return {void | false}
         */
        article => this.render(article)
      )
    })
  }
}
