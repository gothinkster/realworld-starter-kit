import { Slim } from "slim-js";
import { tag, template } from "slim-js/Decorators"
import { dispatch, Events } from "../event-bus"
import binadble from '../../src/decorators/bindable'

@tag('editor-page')
@template(/*html*/`
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <form submit="handleFormSubmit" input="handleFormInput">
          <fieldset>
            <fieldset class="form-group">
                <input s:id="titleInput" name="title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input s:id="descInput" name="description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea s:id="bodyInput" name="body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input s:id="tagsInput" name="tags" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <input s:id="submitBtn" disabled="disabled" type="submit" class="btn btn-lg pull-xs-right btn-primary" bind:value="getSubmitMessage(article, editMode)" />
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
`)
class SlimComponent extends Slim {

  @binadble('article', ['onArticleLoaded']) article

  routeParams
  editMode

  onRender() {
    if (this.routeParams) {
      const {slug} = this.routeParams
      this.editMode = slug
      if (this.article && this.article.slug && this.article.slug === slug) {
        return this.onArticleLoaded()
      }
      dispatch(Events.GET_ARTICLE, this.routeParams.slug)
    } else {
      this.editMode = false
    }
  }

  getSubmitMessage() {
    return this.editMode ? 'Update Article' : 'Publish Article'
  }

  onArticleLoaded() {
    const {article} = this
    if (!article) return
    this.titleInput.value = article.title
    this.tagsInput.value = article.tagList.join(', ')
    this.bodyInput.value = article.body
    this.descInput.value = article.description
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    if (this.checkValidity()) {
      dispatch(Events.POST_ARTICLE, {
        title: this.titleInput.value,
        description: this.descInput.value,
        body: this.bodyInput.value,
        tagList: this.tagsInput.value.split(',').map(tag => tag.trim(' '))
      })
    }

    return false
  }

  checkValidity () {
    return this.titleInput.value &&
      this.descInput.value &&
      this.bodyInput.value
  }

  handleFormInput () {
    if (this.checkValidity()) {
      this.submitBtn.removeAttribute('disabled')
    } else {
      this.submitBtn.setAttribute('disabled', 'disabled')
    }
  }
}