import { component$ } from "@builder.io/qwik";
import { CommentData } from "~/model/article-data";

export const Comment = component$((comment: CommentData) => {
  return (
    <div class="card">
      <p> {comment.body}</p>
      <div class="card-footer">
        {comment.author.username}
        <img src={comment.author.imageUrl}></img>
      </div>
    </div>
  );
});
