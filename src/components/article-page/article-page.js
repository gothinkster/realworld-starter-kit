import {template, tag} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import bindable from '../../decorators/bindable';
import { dispatch, Events } from '../../event-bus';

import './article-header'

@tag('article-page')
@template(/*html*/`
<div class="article-page" s:if="article">
  <article-header
    bind:title="article.title"
    bind:author="article.author.username"
    bind:is-following="article.author.following"
    bind:author-image="article.author.image"
    bind:created-at="article.createdAt"
    bind:favorites-count="article.favoritesCount"
    bind:favorited="article.favorited"
    bind:slug="article.slug"
  ></article-header>
    
  
  <div class="container page">
    
    <div class="row article-content">
      <markdown-view bind:article-content="article.body"></markdown-view>
    </div>
    
    <hr />
    
    <div class="article-actions">
      <div class="article-meta">
        <a href="profile.html"><img bind:src="article.author.image" /></a>
        <div class="info">
          <a click="navToProfile" class="author" bind>{{article.author.username}}</a>
        </div>
        <a s:if="isOwner" class="btn btn-outline-secondary btn-sm" bind:href="editArticleURL"><i class="ion-edit"></i>&nbsp;Edit Article</a>
        <button s:if="isOwner" class="btn btn-outline-danger btn-sm" 
          click="deleteArticle"><i class="ion-trash-a"></i> Delete Article</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <form class="card comment-form" submit="postComment">
          <div class="card-block">
            <textarea input="onCommentInput" s:id="commentText" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img bind:src="article.author.image" class="comment-author-img" />
            <input s:id="submitButton" disabled="disabled" type="submit" class="btn btn-sm btn-primary" value="Post Comment" />
          </div>
        </form>
        <article-comment s:repeat="comments"></article-comment>
      </div>
    </div>
  </div>
</div>
`)
class SlimComponent extends Slim {
  routeParams
  isOwner
  editArticleURL
  
  @bindable('article', ['checkOwnership']) article
  @bindable('comments', ['onCommentsData']) comments
  @bindable('user', ['checkOwnership']) user
  
  onAdded () {
    const {slug} = this.routeParams
    dispatch(Events.GET_ARTICLE, slug)
    this.checkOwnership()
  }

  checkOwnership () {
    const {article, user} = this
    if (article) {
      this.editArticleURL = '#/editor/' + article.slug
    }
    this.isOwner = (user && article && article.author.username === user.username)
  }

  onCommentsData () {
    if (this.commentText) {
      this.commentText.value = null
      this.submitButton.setAttribute('disabled', 'disabled')
    }
  }

  postComment (evt) {
    evt.preventDefault()
    const comment = this.commentText.value
    const { slug } = this.article
    dispatch(Events.POST_COMMENT, {
      comment,
      slug
    })
  }

  onCommentInput() {
    if (this.commentText.value) {
      this.submitButton.removeAttribute('disabled')
    } else {
      this.submitButton.setAttribute('disabled', 'disabled')
    }
  }

  deleteArticle() {
    dispatch(Events.TRASH_ARTICLE, article.slug)
  }
}