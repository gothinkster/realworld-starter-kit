// @ts-check

/* global CustomEvent */
/* global HTMLElement */

import { secureImageSrc } from '../../helpers/Utils.js'

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class ArticleMeta
 */
export default class ArticleMeta extends HTMLElement {
  /**
   * customDefine
   *
   * @param {import("../../helpers/Interfaces.js").SingleArticle | null} [article = null]
   */
  constructor (article = null) {
    super()

    // allow innerHTML ArticleMeta with article as a string attribute
    this.article = article || JSON.parse((this.getAttribute('article') || '').replace(/'/g, '"') || '{}')

    /**
     * target button or button's only child <i> click to dispatch a CustomEvent setFavorite, which expects a Promise.resolve(new article) as a response
     *
     * @param {event & {target: HTMLElement}} event
     * @return {Promise<import("../../helpers/Interfaces.js").SingleArticle | false> | false}
     */
    this.clickListener = event => {
      const button = this.querySelector('button')
      if (!event.target || (event.target !== button && event.target.parentElement !== button)) return false
      event.preventDefault()
      return new Promise(resolve => {
        this.dispatchEvent(new CustomEvent('setFavorite', {
          /** @type {import("../controllers/Favorite.js").SetFavoriteEventDetail} */
          detail: {
            article: this.article,
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
         * @return {import("../../helpers/Interfaces.js").SingleArticle | any}
         */
        article => this.render(article)
      )
    }
  }

  connectedCallback () {
    this.addEventListener('click', this.clickListener)
    if (this.shouldComponentRender()) this.render(this.article)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
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
   * @return {article | string}
   */
  render (article = this.article) {
    if (!article.author || !article.tagList) return this.innerHTML = '<div class="article-meta">An error occurred rendering the article-meta!</div>'
    this.innerHTML = `
      <div class="article-meta">
        <a href="#/profile/${article.author.username}"><img src="${secureImageSrc(article.author.image)}" /></a>
        <div class="info">
          <a href="#/profile/${article.author.username}" class="author">${article.author.username}</a>
          <span class="date">${new Date(article.createdAt).toDateString()}</span>
        </div>
        <button class="btn ${article.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right">
          <i class="ion-heart"></i> ${article.favoritesCount}
        </button>
      </div>
    `
    return article
  }
}
