// @ts-check

/* global HTMLElement */
/* global AbortController */
/* global CustomEvent */
/* global fetch */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-article
 *
 * @typedef {{ slug?: string }} RequestGetArticleEventDetail
 */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#single-article
 *
 * @typedef {{
      slug: RequestGetArticleEventDetail,
      fetch: Promise<import("../../helpers/Interfaces.js").SingleArticle>
    }} GetArticleEventDetail
 */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-article
 * As a controller, this component becomes a store and organizes events
 * dispatches: 'getArticle' on 'requestGetArticle'
 *
 * @export
 * @class GetArticle
 */
export default class GetArticle extends HTMLElement {
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
     * Listens to the event name/typeArg: 'requestGetArticle'
     *
     * @param {CustomEvent & {detail: RequestGetArticleEventDetail}} event
     */
    this.requestGetArticleListener = event => {
      // if no slug is sent, we grab it here from the location, this logic could also be handle through an event at the router
      const slug = event.detail.slug || (location.hash.match(/[^\/]+$/) || [])[0] || ''
      const url = `${Environment.fetchBaseUrl}articles/${slug}`
      // reset old AbortController and assign new one
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      // answer with event
      this.dispatchEvent(new CustomEvent('getArticle', {
        /** @type {GetArticleEventDetail} */
        detail: {
          slug,
          fetch: fetch(url, { signal: this.abortController.signal }).then(response => {
            if (response.status >= 200 && response.status <= 299) return response.json()
            throw new Error(response.statusText)
          // @ts-ignore
          }).catch(error => console.warn(url, error) || error)
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    this.addEventListener('requestGetArticle', this.requestGetArticleListener)
  }

  disconnectedCallback () {
    this.removeEventListener('requestGetArticle', this.requestGetArticleListener)
  }
}
