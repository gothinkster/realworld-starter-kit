// @ts-check

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#ListArticles
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class ListArticles
 */
export default class ListArticles extends HTMLElement {
  constructor () {
    super()

    /**
     * Listens to the event name/typeArg: 'listArticles'
     *
     * @param {CustomEvent & {detail: import("../controllers/ListArticles.js").ListArticlesEventDetail}} event
     */
    this.listArticlesListener = (event) => event.detail.fetch.then(multipleArticles => this.render(multipleArticles))
  }

  connectedCallback () {
    document.body.addEventListener('listArticles', this.listArticlesListener)
    // on every connect it will attempt to get newest articles
    this.dispatchEvent(new CustomEvent('requestListArticles', {
      /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
      detail: {},
      bubbles: true, cancelable: true, composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('listArticles', this.listArticlesListener)
  }

  /**
   * renders the header within the body, which is in this case the navbar
   *
   * @param {import("../../helpers/Interfaces.js").MultipleArticles} multipleArticles
   * @return {void}
   */
  render(multipleArticles) {
    multipleArticles?.articles.forEach(article => {
      const el = document.createElement('div')
      el.classList.add('article-preview')
      el.textContent = article.title
      this.appendChild(el)
    })
  }
}
