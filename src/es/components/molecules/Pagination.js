// @ts-check

/* global CustomEvent */
/* global HTMLElement */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Pagination
 */
export default class Pagination extends HTMLElement {
  constructor () {
    super()

    // keep a reference with the last received listArticles tag used for new offset requests to avoid loosing tag focus
    this.tag = ''
    // avoid loosing feed focus
    this.showFeed = false

    /**
     * Listens to the event name/typeArg: 'listArticles'
     *
     * @param {CustomEvent & {detail: import("../controllers/ListArticles").ListArticlesEventDetail}} event
     */
    this.listArticlesListener = event => this.render(event.detail.fetch, event.detail.query)

    /**
     * target href to dispatch a CustomEvent requestListArticles, which will trigger ListArticlePreviews to render with new query
     *
     * @param {event & {target: HTMLElement}} event
     * @return {void | false}
     */
    this.clickListener = event => {
      if (!event.target || event.target.tagName !== 'A') return false
      event.preventDefault()
      // on every link click it will attempt to get articles by pagination
      this.dispatchEvent(new CustomEvent('requestListArticles', {
        /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
        detail: {
          offset: (Number(event.target.textContent) - 1) * Environment.articlesPerPageLimit,
          tag: this.tag,
          showFeed: this.showFeed
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    document.body.addEventListener('listArticles', this.listArticlesListener)
    this.addEventListener('click', this.clickListener)
    // on every connect it will attempt to get newest articles
    this.dispatchEvent(new CustomEvent('requestListArticles', {
      /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('listArticles', this.listArticlesListener)
    this.removeEventListener('click', this.clickListener)
  }

  /**
   * renders the articles pagination
   *
   * @param {Promise<import("../../helpers/Interfaces.js").MultipleArticles>} fetchMultipleArticles
   * @param {import("../controllers/ListArticles").RequestListArticlesEventDetail} query
   * @return {void}
   */
  render (fetchMultipleArticles, query) {
    fetchMultipleArticles.then(multipleArticles => {
      if (!multipleArticles || !multipleArticles.articlesCount || !multipleArticles.articles) {
        this.innerHTML = ''
      } else {
        // save the tag for further pagination requests
        this.tag = query.tag || ''
        this.showFeed = query.showFeed || false
        const offset = query.offset || 0
        let pageItems = ''
        for (let i = 0; i < Math.ceil(multipleArticles.articlesCount / Environment.articlesPerPageLimit); ++i) {
          pageItems += `<li class="page-item ${i === offset / Environment.articlesPerPageLimit ? 'active' : ''}"><a class="page-link" href="">${i + 1}</a></li>`
        }
        this.innerHTML = `
          <nav>
            <ul class="pagination">
              ${pageItems}
            </ul>
          </nav>
        `
      }
    // @ts-ignore
    }).catch(error => console.warn(error))
  }
}
