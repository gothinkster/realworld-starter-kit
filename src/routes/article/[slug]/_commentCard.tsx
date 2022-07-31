import { component$, Host, QRL } from "@builder.io/qwik"
import { components } from "~/libs/api-schema"

export interface CommentCardProps {
  comment: components["schemas"]["Comment"]
  user?: components["schemas"]["User"]
  handleDelete: QRL<(commentId: number) => void>
}
// TODO: edit function in demo.realworld.io also not implement yet.

export const CommentCard = component$((props: CommentCardProps) => {
  const comment = props.comment
  return (
    <Host>
      <div class="card-block">
        <p class="card-text">{comment.body}</p>
      </div>
      <div class="card-footer">
        <a href={`/profile/@${comment.author.username}`} class="comment-author">
          <img src={comment.author.image} class="comment-author-img" />
        </a>
        &nbsp;
        <a href={`/profile/@${comment.author.username}`} class="comment-author">
          {comment.author.username}
        </a>
        <span class="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        {comment.author.username === props.user?.username && (
          <span class="mod-options">
            <i class="ion-edit"></i>
            <i class="ion-trash-a" onClick$={() => props.handleDelete.apply(null, [comment.id])}></i>
          </span>
        )}
      </div>
    </Host>
  )
})
