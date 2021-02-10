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
    this.actions = actions

    /**
     * Listens to the event name/typeArg: 'getArticle'
     *
     * @param {CustomEvent & {detail: import("../controllers/Article.js").ArticleEventDetail}} event
     */
    this.getArticleListener = event => event.detail.fetch.then(({ article }) => {
      if (article.slug === this.article.slug) this.render(article)
    })

    /**
     * target button or button's only child <i> click to dispatch a CustomEvent setFavorite, which expects a Promise.resolve(new article) as a response
     *
     * @param {event & {target: HTMLElement}} event
     * @return {Promise<import("../../helpers/Interfaces.js").SingleArticle | false> | false}
     */

    this.favoriteBtnListener = event => {
      if (!event.target) return false
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

    this.followBtnListener = event => {
      if (!event.target) return false
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('followUser', {
        /** @type {import("../controllers/Favorite.js").SetFavoriteEventDetail} */
        detail: {
          article: this.article
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.deleteBtnListener = event => {
      if (!event.target) return false
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('deleteArticle', {
        /** @type {import("../controllers/Article.js").DeleteArticleEventDetail} */
        detail: {
          slug: this.article.slug
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    document.body.addEventListener('article', this.getArticleListener)
    if (this.shouldComponentRender()) this.render(this.article)
  }

  disconnectedCallback () {
    document.body.removeEventListener('article', this.getArticleListener)
    if (this.btnFavorite) this.btnFavorite.removeEventListener('click', this.favoriteBtnListener)
    if (this.btnFollow) this.btnFollow.removeEventListener('click', this.followBtnListener)
    if (this.btnDelete) this.btnDelete.removeEventListener('click', this.deleteBtnListener)
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
   * @param {import("../../helpers/Interfaces.js").SingleArticle & {author: {self: boolean}}} [article = this.article]
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

        ${this.actions
          ? article.author.self
            ? `<a class="btn btn-outline-secondary btn-sm" href="#/editor/${article.slug}">
            <i class="ion-edit"></i>Edit Article</a>
            <button name="delete" class="btn btn-outline-danger btn-sm"><i class="ion-trash-a"></i>Delete Article</button>`
          : `<button name="follow" class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow ${article.author.username}
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
    if (this.btnFavorite) this.btnFavorite.addEventListener('click', this.favoriteBtnListener)
    if (this.btnFollow) this.btnFollow.addEventListener('click', this.followBtnListener)
    if (this.btnDelete) this.btnDelete.addEventListener('click', this.deleteBtnListener)
    return (this.article = article)
  }

  get btnFavorite() {
    return this.querySelector('button[name=favorite]')
  }

  get btnFollow() {
    return this.querySelector('button[name=follow]')
  }

  get btnDelete() {
    return this.querySelector('button[name=delete]')
  }

}
