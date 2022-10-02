import { component$, Resource, useResource$, useStore } from "@builder.io/qwik";
import { RequestHandler, useLocation } from "@builder.io/qwik-city";
import axios from "axios";
import { CommentData } from "~/model/article-data";
import { Comment } from "./comment/comment";
import { ArticleHeader } from "./article-header/article-header";
import "./index.css";
import { ArticleTagsList } from "~/components/article-tags-list/article-tags-list";
import { ArticleMeta } from "./article-meta/article-meta";
import { BASE_URL } from "~/common/api";
import { getAuthToken } from "~/auth/auth";

export default component$(() => {
  const location = useLocation();
  const state = useStore({ name: location.params.articleName });
  const authenticated = !!getAuthToken();
  const articleResource = useResource$(async ({ track, cleanup }) => {
    track(state, "name");
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const articleResponse = await axios.get(
      `${BASE_URL}/articles/${state.name}`
    );
    const article = await articleResponse.data.article;
    article.author.imageUrl = article.author.image;
    const commentsResponse = await axios.get(
      `${BASE_URL}/articles/${state.name}/comments`
    );
    article.comments = commentsResponse.data.comments.map((comment: any) => ({
      ...comment,
      author: { ...comment.author, imageUrl: comment.author.image },
    }));
    return article;
  });

  return (
    <>
      <Resource
        value={articleResource}
        onResolved={(article: any) => (
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
              {article.comments.map((comment: CommentData) => {
                return <Comment {...comment}></Comment>;
              })}
            </div>
          </div>
        )}
      ></Resource>
    </>
  );
});
