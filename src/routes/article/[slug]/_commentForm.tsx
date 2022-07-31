import { component$, Host } from "@builder.io/qwik";
import { components } from "~/libs/api-schema";

export interface CommentFormProps {
  slug: string
  user: components['schemas']['User']
}

export const CommentForm = component$((props: CommentFormProps) => {

  return (
    <Host method="post" action={`/article/${props.slug}/comments`} >
      <div class="card-block">
        <textarea
          name="body"
          class="form-control"
          placeholder="Write a comment..."
          rows={3}
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          src={props.user.image}
          class="comment-author-img"
        />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </Host>
  );
}, {
  tagName: 'form'
});