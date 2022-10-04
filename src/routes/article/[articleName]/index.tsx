import {
  component$,
  Resource,
  useResource$,
  useStore,
  $,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import axios from "axios";
import { CommentData } from "~/model/article-data";
import { Comment } from "./comment/comment";
import { ArticleHeader } from "./article-header/article-header";
import "./index.css";
import { ArticleTagsList } from "~/components/article-tags-list/article-tags-list";
import { ArticleMeta } from "./article-meta/article-meta";
import { BASE_URL } from "~/common/api";
import { getAuthToken, getUser } from "~/auth/auth";
import { CommentForm } from "./commentForm/commentForm";

export const postComment = $((state: any, body: string) => {
  axios
    .post(
      `${BASE_URL}articles/${state.name}/comments`,
      {
        comment: { body },
      },
      { headers: { authorization: getAuthToken() } }
    )
    .then(() => {
      state.commentChanged = true;
    });
});

export default component$(async () => {
  const location = useLocation();
  const state = useStore({
    name: location.params.articleName,
    commentChanged: false,
  });
  const authenticated = !!getAuthToken();
  const articleResource = useResource$(async ({ track, cleanup }) => {
    track(state, "name");
    track(state, "commentChanged");
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const articleResponse = await axios.get(
      `${BASE_URL}/articles/${state.name}`
    );
    const article = await articleResponse.data.article;
    article.author.imageUrl = article.author.image;
    const commentsResponse = await axios.get(
      `${BASE_URL}articles/${state.name}/comments`,
      {
        headers: {
          authorization: getAuthToken(),
        },
      }
    );
    article.comments = commentsResponse.data.comments.map((comment: any) => ({
      ...comment,
      author: { ...comment.author, imageUrl: comment.author.image },
    }));
    return article;
  });

  const user = await getUser();
  return (
    <>
      <Resource
        value={articleResource}
        onResolved={(article: any) => {
          return (
            <div>
              <ArticleHeader
                article={article}
                authenticated={authenticated}
              ></ArticleHeader>

              <div class="container">
                <ArticleTagsList tagsList={article.tagList}></ArticleTagsList>
                <div class="meta-container">
                  <ArticleMeta
                    article={article}
                    authenticated={authenticated}
                  ></ArticleMeta>
                </div>
                {authenticated ? (
                  <CommentForm
                    user={user}
                    postComment={$((comment) => postComment(state, comment))}
                  ></CommentForm>
                ) : (
                  <>
                    <a href="/signin">Sign in</a> or{" "}
                    <a href="/register">Sign up</a> to add comments on this
                    article.
                  </>
                )}
                {article.comments.map((comment: CommentData) => {
                  return <Comment {...comment}></Comment>;
                })}
              </div>
            </div>
          );
        }}
      ></Resource>
    </>
  );
});
