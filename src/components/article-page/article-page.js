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
        
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <form class="card comment-form" submit="postComment">
          <div class="card-block">
            <textarea s:id="commentText" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img bind:src="article.author.image" class="comment-author-img" />
            <input type="submit" class="btn btn-sm btn-primary" value="Post Comment" />
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
  
  @bindable() article
  @bindable('comments', ['onCommentsData']) comments
  
  onAdded () {
    const {slug} = this.routeParams
    dispatch(Events.GET_ARTICLE, slug)
  }

  onCommentsData () {
    if (this.commentText) {
      this.commentText.value = null
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
}


const stub = {
  "title":"dasd",
  "slug":"dasd-k0jekh",
  "body":"dasda",
  "createdAt":"2018-05-09T15:41:22.402Z",
  "updatedAt":"2018-05-09T15:41:22.402Z",
  "tagList":["caramel","baby","sugar","happiness","clean","well","cookies","animation","japan","cars","sushi","money","flowers","coffee","tags","as","test","training","dragons"],
  "description":"das",
  "author":{"username":"lethanhhuu123","bio":"le thanh huu ne`","image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},
  "favorited":false,
  "favoritesCount":0
}