// @ts-check

/* global HTMLElement */
/* global CustomEvent */

import { Environment } from '../../helpers/Environment.js'

/**
 * https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#createedit-article
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Editor
 */
export default class Editor extends HTMLElement {
  constructor () {
    super()

    this.publishListener = event => {
      if (!event.target || event.target.tagName !== 'BUTTON') return false
      event.preventDefault()

      const body = {
        article: {
          title: this.titleField.value,
          description: this.descriptionField.value,
          body: this.bodyField.value,
          tagList: this.tagField.value.split(/(?:,| )+/)
        }
      }

      this.dispatchEvent(new CustomEvent('postArticle', {
        detail: {
          body: body,
          slug: Environment.slug
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.articleListener = event => event.detail.fetch.then(response => {
      if (response) this.render(response.article)
    }).catch(error => (this.errorMessages = error))
  }

  connectedCallback () {
    document.body.addEventListener('article', this.articleListener)

    if (Environment.slug) {
      this.dispatchEvent(new CustomEvent('requestArticle', {
        /** @type {import("../controllers/Article.js").RequestArticleEventDetail} */
        detail: {
          slug: Environment.slug
        }, // slug gets decided at Article.js controller, could also be done by request event to router
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.render()
    this.addEventListener('click', this.publishListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.publishListener)
    document.body.removeEventListener('article', this.articleListener)
  }

  /**
   * renders the Editor
   *
   * @param {import("../../helpers/Interfaces.js").SingleArticle} [article=null]
   * @return {void}
   */
  render (article) {
    this.innerHTML = /* html */`
        <div class="editor-page">
        <div class="container page">
          <div class="row">


          <div class="col-md-10 offset-md-1 col-xs-12">
            <ul class="error-messages"></ul>
              <form>
                <fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control form-control-lg" name="title" value="${article ? article.title : ''}" placeholder="Article Title">
                  </fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control" name="description" value="${article ? article.description : ''}" placeholder="What's this article about?">
                  </fieldset>
                  <fieldset class="form-group">
                      <textarea class="form-control" name="body" rows="8" placeholder="Write your article (in markdown)">${article ? article.body : ''}</textarea>
                  </fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control" name="tagList" value="${article ? article.tagList.reduce((acc, curr) => `${curr} ${acc}`, '') : ''}" placeholder="Enter tags"><div class="tag-list"></div>
                  </fieldset>
                  <button class="btn btn-lg pull-xs-right btn-primary" type="button">
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    `
  }

  /**
   * @return {HTMLInputElement}
   */
  get titleField () {
    return this.querySelector('input[name=title]')
  }

  /**
   * @return {HTMLInputElement}
   */
  get descriptionField () {
    return this.querySelector('input[name=description]')
  }

  /**
   * @return {HTMLTextAreaElement}
   *
   */
  get bodyField () {
    return this.querySelector('textarea[name=body]')
  }

  /**
   * @return {HTMLInputElement}
   */
  get tagField () {
    return this.querySelector('input[name=tagList]')
  }

  set errorMessages (errors) {
    const ul = this.querySelector('.error-messages')
    if (ul && typeof errors === 'object') {
      ul.innerHTML = ''
      for (const key in errors) {
        const li = document.createElement('li')
        li.textContent = `${key}: ${errors[key].reduce((acc, curr) => `${acc}${acc ? ' | ' : ''}${curr}`, '')}`
        ul.appendChild(li)
      }
    }
  }
}
