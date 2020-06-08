// @ts-check

import { Environment } from '../../helpers/Environment.js'
import { MasterShadow } from '../prototypes/MasterShadow.js'

/**
 * As a page, this component becomes a domain dependent container
 * this style and html should be set at its parent index.html, for immediate visual feedback
 *
 * @export
 * @class Home
 */
export default class Home extends MasterShadow() {
  constructor (...args) {
    super({ mode: 'false' }, ...args)
  }

  connectedCallback () {
    console.log('HoME test api: ', Environment.fetchBaseUrl);
    fetch(`${Environment.fetchBaseUrl}articles?limit=10&offset=0`).then(response => response?.json()).then(data => {
      data?.articles.forEach(article => {
        const el = document.createElement('div')
        el.classList.add('article-preview')
        el.textContent = article.title
        this.html = el
      })
    })
  }
}
