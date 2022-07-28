import { For, onMount, Suspense } from "solid-js";

import Comment from "./Comment";
import CommentInput from "./CommentInput";

import { useStore } from "~/store";
import NavLink from "~/components/NavBar/NavLink";

export default (props) => {
  const [store, { createComment, deleteComment, loadComments }] = useStore();
  const { currentUser } = store;
  const handleDeleteComment = (commentId: number) => deleteComment(commentId);

  onMount(() => loadComments(props.slug));

  return (
    <div class="col-xs-12 col-md-8 offset-md-2">
      {currentUser ? (
        <CommentInput
          avatarUrl={currentUser.image}
          createComment={createComment}
        />
      ) : (
        <p>
          <NavLink route="/login">Sign in</NavLink>
          &nbsp;or&nbsp;
          <NavLink route="/register">sign up</NavLink>
          &nbsp;to add comments on this article.
        </p>
      )}
      <Suspense fallback="Loading comments">
        <For each={store.comments}>
          {(comment) => (
            <Comment
              comment={comment}
              currentUser={currentUser}
              onDelete={handleDeleteComment}
            />
          )}
        </For>
      </Suspense>
    </div>
  );
};
