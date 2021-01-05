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

    this.isFeedDisabled = false

    /**
     * Listens to the event name/typeArg: 'listArticles'
     *
     * @param {CustomEvent & {detail: import("../controllers/ListArticles").ListArticlesEventDetail}} event
     */
    this.listArticlesListener = event => this.render(event.detail.query.tag, undefined, event.detail.query.showFeed)

    /**
     * Listens to the event name/typeArg: 'getArticle'
     *
     * @param {CustomEvent & {detail: import("../controllers/User.js").UserEventDetail}} event
     */
    this.userListener = event => {
      event.detail.fetch.then(user => {
        console.log('gotUser@ArticleFeedToggle', user)
        if (this.shouldComponentRender(!!user)) this.render(undefined, !!user)
      }).catch((error) => {
        console.log(error)
        if (this.shouldComponentRender(false)) this.render(undefined, false)
      })
      
    }

    /**
     * target href to dispatch a CustomEvent requestListArticles, which will trigger ListArticlePreviews to render with new query
     *
     * @param {event & {target: HTMLElement}} event
     * @return {void | false}
     */
    this.clickListener = event => {
      if (!event.target) return false
      event.preventDefault()
      if (event.target.id === 'your-feed' && this.isFeedDisabled) {
        // get logged in users feed
        this.dispatchEvent(new CustomEvent('requestListArticles', {
          /** @type {import("../controllers/ListArticles.js").RequestListArticlesEventDetail} */
          detail: {
            showFeed: true
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      } else {
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
  }

  connectedCallback () {
    document.body.addEventListener('listArticles', this.listArticlesListener)
    document.body.addEventListener('user', this.userListener)
    this.addEventListener('click', this.clickListener)
    if (this.shouldComponentRender()) this.render()
    this.dispatchEvent(new CustomEvent('getUser', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener('listArticles', this.listArticlesListener)
    document.body.removeEventListener('user', this.userListener)
    this.removeEventListener('click', this.clickListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @param {boolean} isFeedDisabled
   * @return {boolean}
   */
  shouldComponentRender (isFeedDisabled) {
    return !this.innerHTML || this.isFeedDisabled !== isFeedDisabled
  }

  /**
   * renders the header within the body, which is in this case the navbar
   *
   * @param {string} [tag = '']
   * @param {boolean} [isFeedDisabled = undefined]
   * @param {boolean} [showFeed = undefined]
   * @return {void}
   */
  render (tag, isFeedDisabled, showFeed) {
    if (isFeedDisabled !== undefined) this.isFeedDisabled = isFeedDisabled
    this.innerHTML = `
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item">
            <a id=your-feed class="nav-link${this.isFeedDisabled ? '' : ' disabled'} ${tag || !showFeed ? '' : 'active'}" href="">Your Feed</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${tag || showFeed ? '' : 'active'}" href="#/">Global Feed</a>
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
