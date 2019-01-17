import { tag, template } from "slim-js/Decorators";
import { dispatch, Events } from "../../event-bus";

@tag('article-header')
@template(/*html*/`
<div class="banner">
  <div class="container">
    
    <h1 bind>{{title}}</h1>
    
    <div class="article-meta">
      <a href=""><img bind:src="authorImage" /></a>
      <div class="info">
        <a href="" class="author" bind>{{author}}</a>
        <span class="date" bind>{{createdAt}}</span>
      </div>
      <button s:if="!isFollowing"
        click="follow"
        class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        <span bind>&nbsp;Follow {{author}}</span>
      </button>
      <button s:if="isFollowing"
        click="unfollow"
        class="btn btn-sm action-btn btn-secondary">
        <i class="ion-minus-round"></i>
        <span bind>&nbsp;Unfollow {{author}}</span>
      </button>
      &nbsp;&nbsp;
      <button s:if="!favorited"
        click="handleFavArticle"
        class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Article
        <span class="counter" bind>({{favoritesCount}})</span>
      </button>

      <button s:if="favorited"
        click="handleUnfavArticle"
        class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Unfavorite Article
        <span class="counter" bind>({{favoritesCount}})</span>
      </button>
    </div>
  </div>
</div>
`)
class SlimComponent extends Slim {

  title
  author
  createdAt
  favoritesCount
  isFollowing
  authorImage
  slug

  follow() {
    dispatch(Events.FOLLOW, this.author)
    this.isFollowing = true
  }

  unfollow() {
    dispatch(Events.UNFOLLOW, this.author)
    this.isFollowing = false
  }

  handleUnfavArticle() {
    dispatch(Events.UNFAVOR_ARTICLE, this.slug)
  }

  handleFavArticle () {
    dispatch(Events.FAVOR_ARTICLE, this.slug)
  }

}