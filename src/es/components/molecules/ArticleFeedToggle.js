// @ts-check

/* global CustomEvent */
/* global HTMLElement */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class ArticleFeedToggle
 */
export default class ArticleFeedToggle extends HTMLElement {
  constructor () {
    super()

    /**
     * Listens to the event name/typeArg: 'listArticles'
     *
     * @param {CustomEvent & {detail: import("../controllers/ListArticles").ListArticlesEventDetail}} event
     */
    this.listArticlesListener = event => this.render(event.detail.query.tag)

    /**
     * target href to dispatch a CustomEvent requestListArticles, which will trigger ListArticlePreviews to render with new query
     *
     * @param {event & {target: HTMLElement}} event
     * @return {void | false}
     */
    this.clickListener = event => {
      if (!event.target) return false
      event.preventDefault()
      // TODO: should trigger different details from different menu points
      // on every link click it will attempt to get articles by tags
      this.dispatchEvent(new CustomEvent('requestListArticles', {
        /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
        detail: {},
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    document.body.addEventListener('listArticles', this.listArticlesListener)
    this.addEventListener('click', this.clickListener)
    if (this.shouldComponentRender()) this.render()
  }

  disconnectedCallback () {
    document.body.removeEventListener('listArticles', this.listArticlesListener)
    this.removeEventListener('click', this.clickListener)
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
   * renders the header within the body, which is in this case the navbar
   *
   * @param {string} [tag = '']
   * @return {void}
   */
  render (tag) {
    this.innerHTML = `
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item">
            <a class="nav-link disabled" href="">Your Feed</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${tag ? '' : 'active'}" href="#/">Global Feed</a>
          </li>
          ${tag ? `
            <li class="nav-item">
              <a href="#/" class="nav-link active">
                <i class="ion-pound"></i>${tag}
              </a>
            </li>
          ` : ''}
        </ul>
      </div>
    `
  }
}
