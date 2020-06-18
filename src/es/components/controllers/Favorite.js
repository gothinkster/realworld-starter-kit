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
     * @return {Promise<import("../../helpers/Interfaces.js").SingleArticle | Error> | false}
     */
    this.setFavoriteListener = event => {
      // TODO: login/authentication
      if (!event.detail.article || !event.detail.resolve) return false
      const url = `${Environment.fetchBaseUrl}articles/${event.detail.article.slug}/favorite`
      return fetch(url, { method: event.detail.article.favorited ? 'DELETE' : 'POST' }).then(response => {
        if (response.status >= 200 && response.status <= 299) return response.json()
        throw new Error(response.statusText)
      }).then(
        /**
         * Answer the CustomEvent setFavorite
         * 
         * @param {import("../../helpers/Interfaces.js").SingleArticle} article
         * @return {void | false}
         */
        article => event.detail.resolve(article)
      // forward to login, if error means that the user is unauthorized
      // @ts-ignore
      ).catch(error => error.message === 'Unauthorized' ? location.hash = console.warn(url, 'Unauthorized User:', error) || '#/login' : console.warn(url, error) || error)
    }
  }

  connectedCallback () {
    this.addEventListener('setFavorite', this.setFavoriteListener)
  }

  disconnectedCallback () {
    this.removeEventListener('setFavorite', this.setFavoriteListener)
  }
}
