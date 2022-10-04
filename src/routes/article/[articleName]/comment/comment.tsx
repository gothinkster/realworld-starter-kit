import { component$ } from "@builder.io/qwik";
import { formatDate } from "~/common/date-utils";
import { CommentData } from "~/model/article-data";
import "./comment.css";
export const Comment = component$((comment: CommentData) => {
  return (
    <div class="card">
      <p> {comment.body}</p>
      <div class="card-footer">
        <img src={comment.author.imageUrl}></img>
        <div>{comment.author.username}</div>
        <div>{formatDate(comment.updatedAt)}</div>
      </div>
    </div>
  );
});
