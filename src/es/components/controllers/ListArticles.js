// @ts-check

/**
 * https://github.com/gothinkster/realworld/tree/master/api#list-articles
 * 
 * @typedef {{ tag?: string, author?: string, favorited?: string, limit?: number, offset?: number }} RequestListArticlesEventDetail
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
 * https://github.com/gothinkster/realworld/tree/master/api#list-articles
 * As a controller, this component becomes a store and organizes events
 * dispatches: 'ListArticles' on 'requestListArticles'
 *
 * @export
 * @class ListArticles
 */
export default class ListArticles extends HTMLElement {
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
     * Listens to the event name/typeArg: 'requestListArticles'
     *
     * @param {CustomEvent & {detail: RequestListArticlesEventDetail}} event
     */
    this.requestListArticlesListener = (event) => {
      // assemble query
      let query = ''
      for (const key in event?.detail) {
        query += `${query ? '&' : '?'}${key}=${event.detail[key]}`
      }
      // reset old AbortController and assign new one
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      // answer with event
      this.dispatchEvent(new CustomEvent('listArticles', {
        /** @type {ListArticlesEventDetail} */
        detail: {
          query: event.detail,
          queryString: query,
          fetch: fetch(`${Environment.fetchBaseUrl}articles${query}`, { signal: this.abortController.signal }).then(response => response?.json())
        },
        bubbles: true, cancelable: true, composed: true
      }))
    }
  }

  connectedCallback () {
    this.addEventListener('requestListArticles', this.requestListArticlesListener)
  }

  disconnectedCallback () {
    this.removeEventListener('requestListArticles', this.requestListArticlesListener)
  }
}
