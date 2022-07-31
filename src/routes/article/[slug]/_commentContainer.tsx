import { component$, Host, useStore, $, mutable } from "@builder.io/qwik";
import { del } from "~/libs/ajax";
import { components } from "~/libs/api-schema";
import { CommentCard } from "./_commentCard";
import { CommentForm } from "./_commentForm";

export interface CommentContainerProps {
  comments: components['schemas']['Comment'][]
  slug: string
  user?: components['schemas']['User']
}

export const CommentContainer = component$((props: CommentContainerProps) => {
  const store = useStore({
    comments: props.comments
  })
  const handleDelete = $((commentId: number) => {
    del(`/article/${props.slug}/comments/${commentId}.json`)
      .then((resp) => {
        if (resp.ok) {
          console.log(commentId, store.comments.map(i => i.id))
          store.comments = store.comments.filter(i => i.id !== commentId)
        } else {
          throw new Error('not implement error handling')
        }
      })
  })
  return (
    <Host>
      {props.user ? (
        <CommentForm user={props.user} slug={props.slug} class="card comment-form" />
      ) : (
        <p>
          <a href="/login">Sign in</a>
          {' or '}
          <a href="/register">sign up</a>
          {' to add comments on this article.'}
        </p>
      )}
      {store.comments.map((comment) => (
        // warning comment prop should be wrap in mutable, not sure why. `:key` relate ?
        <CommentCard handleDelete={handleDelete} class="card" comment={mutable(comment)} user={props.user} />
      ))}
    </Host>
  );
});