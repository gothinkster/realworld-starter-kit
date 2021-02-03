// @ts-check

/* global HTMLElement */
/* global AbortController */
/* global CustomEvent */
/* global fetch */
/* global self */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-article
 *
 * @typedef {{ slug?: string }} RequestArticleEventDetail
 */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#single-article
 *
 * @typedef {{
      slug: RequestArticleEventDetail,
      fetch: Promise<import("../../helpers/Interfaces.js").SingleArticle>
    }} ArticleEventDetail
 */

 /**
 * https://github.com/gothinkster/realworld/tree/master/api#list-articles
 *
 * @typedef {{ tag?: string, author?: string, favorited?: string, limit?: number, offset?: number, showYourFeed?: boolean }} RequestListArticlesEventDetail
 */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#multiple-articles
 *
 * @typedef {{
  query: RequestListArticlesEventDetail,
  queryString: string,
  fetch: Promise<import("../../helpers/Interfaces.js").MultipleArticles>
}} ListArticlesEventDetail
*/

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-article
 * As a controller, this component becomes a store and organizes events
 * dispatches: 'article' on 'requestArticle'
 *
 * @export
 * @class Article
 */
export default class Article extends HTMLElement {
  constructor () {
    super()

    /**
     * Used to cancel ongoing, older fetches
     * this makes sense, if you only expect one and most recent true result and not multiple
     *
     * @type {AbortController | null}
     */
    this.abortController = null

    /**
     * Listens to the event name/typeArg: 'requestArticle'
     *
     * @param {CustomEvent & {detail: RequestArticleEventDetail}} event
     */
    this.requestGetArticleListener = event => {
      // if no slug is sent, we grab it here from the location, this logic could also be handle through an event at the router
      const slug = event.detail.slug || Environment.slug || ''
      const url = `${Environment.fetchBaseUrl}articles/${slug}`
      // reset old AbortController and assign new one
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      // answer with event
      this.dispatchEvent(new CustomEvent('article', {
        /** @type {ArticleEventDetail} */
        detail: {
          slug,
          fetch: fetch(url, {
            signal: this.abortController.signal,
            ...Environment.fetchHeaders
          }).then(response => {
            if (response.status >= 200 && response.status <= 299) return response.json()
            throw new Error(response.statusText)
          // @ts-ignore
          })
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.postArticleListener = event => {
      const url = `${Environment.fetchBaseUrl}articles${event.detail.slug ? `/${event.detail.slug}` : ''}`

      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      // answer with event
      this.dispatchEvent(new CustomEvent('article', {
        detail: {
          fetch: fetch(url,
            {
              method: event.detail.slug ? 'PUT' : 'POST',
              ...Environment.fetchHeaders,
              body: JSON.stringify(event.detail.body),
              signal: this.abortController.signal
            }).then(response => response.json())
            .then(data => {
              if (data.errors) throw data.errors
              self.location.hash = `#/articles/${data.article.slug}`
            })
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /**
     * Listens to the event name/typeArg: 'requestListArticles'
     *
     * @param {CustomEvent & {detail: RequestListArticlesEventDetail}} event
     */
    this.requestListArticlesListener = event => {
      // add default limit
      const detail = Object.assign({ limit: Environment.articlesPerPageLimit }, event.detail)
      // assemble query
      let query = ''
      for (const key in detail) {
        if (key !== 'showYourFeed') query += `${query ? '&' : '?'}${key}=${detail[key]}`
      }
      const url = `${Environment.fetchBaseUrl}articles${detail.showYourFeed ? '/feed' : ''}${query}`
      // reset old AbortController and assign new one
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      // answer with event
      this.dispatchEvent(new CustomEvent('listArticles', {
        /** @type {ListArticlesEventDetail} */
        detail: {
          query: detail,
          queryString: query,
          fetch: fetch(url, {
            signal: this.abortController.signal,
            ...Environment.fetchHeaders
          }).then(response => {
            if (response.status >= 200 && response.status <= 299) return response.json()
            throw new Error(response.statusText)
          // @ts-ignore
          })
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    this.addEventListener('requestArticle', this.requestGetArticleListener)
    this.addEventListener('postArticle', this.postArticleListener)
    this.addEventListener('requestListArticles', this.requestListArticlesListener)
  }

  disconnectedCallback () {
    this.removeEventListener('requestArticle', this.requestGetArticleListener)
    this.removeEventListener('postArticle', this.postArticleListener)
    this.removeEventListener('requestListArticles', this.requestListArticlesListener)
  }
}
