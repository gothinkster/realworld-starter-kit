import "~/global.css";
import "./commentForm.css";
import { $, component$, useClientEffect$ } from "@builder.io/qwik";
import { UserData } from "~/auth/auth";

export const submitComment = (
  evt: SubmitEvent,
  postComment: (body: string) => void
) => {
  console.log("submit", evt);
  const form = evt.target as HTMLElement;
  evt.preventDefault();
  const body = form.querySelector<HTMLInputElement>('[name="comment"]')!.value;
  postComment(body);
  return false;
};

export const noop = () => {
  return false;
};

export const CommentForm = component$(
  (props: { user: UserData; postComment: (body: string) => void }) => {
    const { user, postComment: postComment$ } = props;
    useClientEffect$(() => {
      document
        .querySelector("form")
        ?.addEventListener("submit", (evt) => submitComment(evt, postComment$));
    });
    return (
      <div class="card comment-form">
        <form>
          <div>
            <textarea name="comment" placeholder="Your comment"></textarea>
          </div>
          <div class="card-footer">
            <div class="author">
              <div>
                <img src={user.image}></img>
              </div>
              <div>
                <span>{user.username}</span>
              </div>
            </div>

            <button type="submit">Post comment</button>
          </div>
        </form>
      </div>
    );
  }
);
