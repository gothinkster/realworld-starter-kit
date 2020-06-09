// @ts-check

/**
 * As a page, this component becomes a domain dependent container
 * this style and html should be set at its parent index.html, for immediate visual feedback
 *
 * @export
 * @class Article
 */
export default class Article extends HTMLElement {
  connectedCallback () {
    console.log('artiCLe');
    const el = document.createElement('div')
    el.classList.add('article-preview')
    el.textContent = 'whaTS O eVEr'
    this.html = el
  }
}
