// @ts-check

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#article
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Article
 */
export default class Article extends HTMLElement {
  connectedCallback () {
    console.log('artiCLe to be done');
    const el = document.createElement('div')
    el.classList.add('article-preview')
    el.textContent = 'whaTS O eVEr'
    this.appendChild(el)
  }
}
