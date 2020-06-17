// @ts-check

/* global HTMLElement */
/* global fetch */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#favorite-article
 *
 * @typedef {{ article: import("../../helpers/Interfaces.js").SingleArticle, resolve: (article: import("../../helpers/Interfaces.js").SingleArticle)=>void }} SetFavoriteEventDetail
 */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/gothinkster/realworld/tree/master/api#favorite-article
 * As a controller, this component becomes a store and organizes events
 * dispatches: triggers detail.resolve function with returned article on 'setFavorite'
 *
 * @export
 * @class Favorite
 */
export default class Favorite extends HTMLElement {
  constructor () {
    super()

    /**
     * Listens to the event name/typeArg: 'setFavorite'
     *
     * @param {CustomEvent & {detail: SetFavoriteEventDetail}} event
     * @return {void | false}
     */
    this.setFavoriteListener = (event) => {
      // TODO: ↓↓↓
      //  login/authentication
      // TODO: ↑↑↑
      if (!event.detail.article || !event.detail.resolve) return false
      fetch(`${Environment.fetchBaseUrl}articles/${event.detail.article.slug}/favorite`, { method: event.detail.article.favorited ? 'DELETE' : 'POST' }).then(response => response.json()).then(
        /**
         * Answer the CustomEvent setFavorite
         * 
         * @param {import("../../helpers/Interfaces.js").SingleArticle} article
         * @return {void | false}
         */
        article => event.detail.resolve(article)
      ).catch(error => {
        console.warn(`${Environment.fetchBaseUrl}articles/${event.detail.article.slug}/favorite:`, error)
        // assume that the user is not logged in and forward to the login page
        location.hash = '#/login'
      })
    }
  }

  connectedCallback () {
    this.addEventListener('setFavorite', this.setFavoriteListener)
  }

  disconnectedCallback () {
    this.removeEventListener('setFavorite', this.setFavoriteListener)
  }
}
