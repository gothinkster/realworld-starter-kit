// @ts-check

/* global customElements */
/* global HTMLElement */

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#home
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class ArticlePreview
 */
export default class ArticlePreview extends HTMLElement {
  /**
   * customDefine
   *
   * @param {import("../../helpers/Interfaces.js").SingleArticle | null} [article = null]
   */
  constructor (article = null) {
    super()

    // allow innerHTML ArticlePreview with article as a string attribute
    this.article = article || JSON.parse((this.getAttribute('article') || '').replace(/'/g, '"') || '{}')
  }

  connectedCallback () {
    this.loadChildComponents()
    if (this.shouldComponentRender()) this.render(this.article)
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
   * renders the article
   *
   * @param {import("../../helpers/Interfaces.js").SingleArticle} [article = this.article]
   * @return {void | string}
   */
  render (article = this.article) {
    if (!article.author || !article.tagList) return (this.innerHTML = '<div class="article-preview">An error occurred rendering the article-preview!</div>')
    this.innerHTML = `
      <div class="article-preview">
        <div class="article-meta"></div>
        <a href="#/article/${article.slug}" class="preview-link">
          <h1>${article.title}</h1>
          <p>${article.description}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            ${article.tagList.reduce((tagListStr, tag) => (tagListStr += `
              <li class="tag-default tag-pill tag-outline">${tag}</li>
            `), '')}
          </ul>
        </a>
      </div>
    `
    this.loadChildComponents().then(children => {
      /** @type {import("../atoms/ArticleMeta.js").default} */
      // @ts-ignore
      const articleMeta = new children[0][1](article)
      this.querySelector('.article-meta').replaceWith(articleMeta)
    })
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../atoms/ArticleMeta.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-article-meta', module.default]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }
}
