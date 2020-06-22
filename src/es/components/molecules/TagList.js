// @ts-check

/* global CustomEvent */
/* global HTMLElement */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class TagList
 */
export default class TagList extends HTMLElement {
  constructor () {
    super()

    /**
     * Listens to the event name/typeArg: 'tags'
     *
     * @param {CustomEvent & {detail: import("../controllers/GetTags.js").TagsEventDetail}} event
     */
    this.tagsListener = event => this.render(event.detail.fetch)

    /**
     * target href to dispatch a CustomEvent requestListArticles, which will trigger ListArticlePreviews to render with new query
     *
     * @param {event & {target: HTMLElement}} event
     * @return {void | false}
     */
    this.clickListener = event => {
      if (!event.target || event.target.tagName !== 'A') return false
      event.preventDefault()
      // on every link click it will attempt to get articles by tags
      this.dispatchEvent(new CustomEvent('requestListArticles', {
        /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
        detail: { tag: event.target.textContent },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    // listen for tags
    document.body.addEventListener('tags', this.tagsListener)
    this.addEventListener('click', this.clickListener)
    // on every connect it will attempt to get newest tags
    this.dispatchEvent(new CustomEvent('getTags', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('tags', this.tagsListener)
    this.removeEventListener('click', this.clickListener)
  }

  /**
   * renders each received tag
   *
   * @param {Promise<import("../../helpers/Interfaces.js").MultipleTags>} fetchTags
   * @return {void}
   */
  render (fetchTags) {
    fetchTags.then(tag => {
      if (!tag || !tag.tags || !tag.tags.length) tag = { tags: ['No tags are here... yet.'] }
      this.innerHTML = `<div class="tag-list">${tag.tags.map(tag => `<a href="#/" class="tag-pill tag-default">${tag}</a>`).join('')}</div>`
    // @ts-ignore
    }).catch(error => (this.innerHTML = console.warn(error) || '<div class="tag-list">An error occurred fetching the tags!</div>'))
  }
}
