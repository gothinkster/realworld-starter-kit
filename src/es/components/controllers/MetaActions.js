// @ts-check

/* global fetch */
/* global HTMLElement */
/* global location */
/* global self */
/* global AbortController */
/* global CustomEvent */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#favorite-article
 *
 * @typedef {{ article: import("../../helpers/Interfaces.js").SingleArticle} SetFavoriteEventDetail
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
    this.isAuthenticated = false
    this.abortController = null
    /**
     * Listens to the event name/typeArg: 'user'
     *
     * @param {CustomEvent & {detail: import("./User.js").UserEventDetail}} event
     */
    this.userListener = event => {
      event.detail.fetch.then(user => {
        this.isAuthenticated = !!user
      }).catch(error => {
        this.isAuthenticated = false
        console.log(`Error@UserFetch: ${error}`)
      })
    }

    /**
     * Listens to the event name/typeArg: 'setFavorite'
     *
     * @param {CustomEvent & {detail: SetFavoriteEventDetail}} event
     * @return {Promise<import("../../helpers/Interfaces.js").SingleArticle | Error> | false}
     */
    this.setFavoriteListener = event => {
      if (!this.isAuthenticated) self.location.href = '#/register'

      if (!event.detail.article || !this.isAuthenticated) return false

      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()

      const url = `${Environment.fetchBaseUrl}articles/${event.detail.article.slug}/favorite`

      return fetch(url, {
        method: event.detail.article.favorited ? 'DELETE' : 'POST',
        ...Environment.fetchHeaders,
        signal: this.abortController.signal
      }).then(response => {
        if (response.status >= 200 && response.status <= 299) return response.json()
        throw new Error(response.statusText)
      }).then(
        /**
         * Answer the CustomEvent setFavorite
         *
         * @param {import("../../helpers/Interfaces.js").SingleArticle} article
         * @return {void | false}
         */
        article => {
          this.dispatchEvent(new CustomEvent('article', {
            /** @type {GetArticleEventDetail} */
            detail: {
              slug: article.slug,
              fetch: Promise.resolve(article)
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        }
      // forward to login, if error means that the user is unauthorized
      // @ts-ignore
      ).catch(error => error.message === 'Unauthorized' ? (location.hash = console.warn(url, 'Unauthorized User:', error) || '#/login') : console.warn(url, error) || error)
    }

    /**
     * Listens to the event name/typeArg: 'setFavorite'
     *
     * @param {CustomEvent & {detail: SetFavoriteEventDetail}} event
     * @return {Promise<import("../../helpers/Interfaces.js").SingleArticle | Error> | false}
     */
    this.followUserListener = event => {
      if (!this.isAuthenticated) self.location.href = '#/register'

      if (!event.detail.article || !this.isAuthenticated) return false

      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()

      const url = `${Environment.fetchBaseUrl}profiles/${event.detail.article.author.username}/follow`

      return fetch(url, {
        method: event.detail.article.author.following ? 'DELETE' : 'POST',
        ...Environment.fetchHeaders,
        signal: this.abortController.signal
      }).then(response => {
        if (response.status >= 200 && response.status <= 299) return response.json()
        throw new Error(response.statusText)
      }).then(
        /**
         * Answer the CustomEvent setFavorite
         *
         * @param {import("../../helpers/Interfaces.js").Profile} profile
         * @return {void | false}
         */
        ({ profile }) => {
          const article = Object.assign(event.detail.article, { author: profile })
          console.log('changed', article)
          this.dispatchEvent(new CustomEvent('article', {
            /** @type {GetArticleEventDetail} */
            detail: {
              slug: article.slug,
              fetch: Promise.resolve({ article: article })
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        }
      // forward to login, if error means that the user is unauthorized
      // @ts-ignore
      ).catch(error => error.message === 'Unauthorized' ? (location.hash = console.warn(url, 'Unauthorized User:', error) || '#/login') : console.warn(url, error) || error)
    }
  }

  connectedCallback () {
    document.body.addEventListener('user', this.userListener)
    this.addEventListener('setFavorite', this.setFavoriteListener)
    this.addEventListener('followUser', this.followUserListener)

    this.dispatchEvent(new CustomEvent('getUser', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('user', this.userListener)
    this.removeEventListener('setFavorite', this.setFavoriteListener)
    this.removeEventListener('followUser', this.followUserListener)
  }
}
