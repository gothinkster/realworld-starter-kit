// @ts-check

/* global HTMLElement */
/* global AbortController */
/* global CustomEvent */
/* global fetch */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-tags
 *
 * @typedef {{
      fetch: Promise<import("../../helpers/Interfaces.js").MultipleTags>
    }} TagsEventDetail
 */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-tags
 * As a controller, this component becomes a store and organizes events
 * dispatches: 'tags' on 'getTags'
 *
 * @export
 * @class GetTags
 */
export default class GetTags extends HTMLElement {
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
     * Listens to the event name/typeArg: 'getTags'
     *
     * @param {CustomEvent} event
     */
    this.getTagsListener = event => {
      const url = `${Environment.fetchBaseUrl}tags`
      // reset old AbortController and assign new one
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      // answer with event
      this.dispatchEvent(new CustomEvent('tags', {
        /** @type {TagsEventDetail} */
        detail: {
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
    this.addEventListener('getTags', this.getTagsListener)
  }

  disconnectedCallback () {
    this.removeEventListener('getTags', this.getTagsListener)
  }
}
