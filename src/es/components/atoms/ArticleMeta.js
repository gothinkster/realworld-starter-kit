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
  constructor (article = null, actions = false) {
    super()

    // allow innerHTML ArticleMeta with article as a string attribute
    this.article = article || JSON.parse((this.getAttribute('article') || '').replace(/'/g, '"') || '{}')
    this.actions = actions;

    /**
     * Listens to the event name/typeArg: 'getArticle'
     *
     * @param {CustomEvent & {detail: import("../controllers/GetArticle.js").GetArticleEventDetail}} event
     */
    this.getArticleListener = event => event.detail.fetch.then(({article}) => {
      if(article.slug === this.article.slug) this.render(article)
    })

    /**
     * target button or button's only child <i> click to dispatch a CustomEvent setFavorite, which expects a Promise.resolve(new article) as a response
     *
     * @param {event & {target: HTMLElement}} event
     * @return {Promise<import("../../helpers/Interfaces.js").SingleArticle | false> | false}
     */
    this.clickListener = event => {
      const favoriteButton = this.querySelector('button[name="favorite"]')

      if (!event.target || (event.target !== favoriteButton && event.target.parentElement !== favoriteButton)) return false
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('setFavorite', {
        /** @type {import("../controllers/Favorite.js").SetFavoriteEventDetail} */
        detail: {
          article: this.article
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    document.body.addEventListener('getArticle', this.getArticleListener)
    this.addEventListener('click', this.clickListener)
    if (this.shouldComponentRender()) this.render(this.article)
  }

  disconnectedCallback () {
    document.body.removeEventListener('getArticle', this.getArticleListener)
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
    if (!article.author || !article.tagList) return (this.innerHTML = '<div class="article-meta">An error occurred rendering the article-meta!</div>')

    this.innerHTML = `
      <div class="article-meta">
        <a href="#/profile/${article.author.username}"><img src="${secureImageSrc(article.author.image)}" /></a>
        <div class="info">
          <a href="#/profile/${article.author.username}" class="author">${article.author.username}</a>
          <span class="date">${new Date(article.createdAt).toDateString()}</span>
        </div>

        ${this.actions ?
          `<button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            TODO: Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;
          <button name="favorite" class="btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(${article.favoritesCount})</span>
          </button>`
        : `<button name="favorite" class="btn ${article.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right">
        <i class="ion-heart"></i> ${article.favoritesCount}
      </button>`}
      </div>
    `
    return (this.article = article)
  }
}
