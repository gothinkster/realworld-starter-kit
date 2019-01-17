import { tag, template } from "slim-js/Decorators";
import { Slim } from "slim-js";
import { dispatch, Events } from "../../event-bus";

@tag('article-comment')
@template(/*html*/`
<div class="card">
  <div class="card-block">
    <p class="card-text" bind>{{data.body}}</p>
  </div>
  <div class="card-footer">
    <span click="clickProfile">
      <a class="comment-author">
        <img bind:src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a class="comment-author" bind>{{data.author.username}}</a>
    </span>
    <span class="date-posted">Dec 29th</span>
    <span s:if="data.isOwner" class="mod-options">
      <i click="trashComment" class="ion-trash-a"></i>
    </span>
  </div>
</div>
`)
class Article extends Slim {
  data

  trashComment() {
    dispatch(Events.TRASH_COMMENT, this.data)
    this.remove()
  }

  clickProfile (e) {
    e.preventDefault()
    dispatch(Events.NAVIGATE_PROFILE, this.data.author.username)
  }
}