import { component$, useStore } from "@builder.io/qwik";
import axios from "axios";
import { getAuthToken } from "~/auth/auth";
import { BASE_URL } from "~/common/api";
import { formatDate } from "~/common/date-utils";
import { ArticleData, AuthorData } from "~/model/article-data";
import "~/global.css";
import "./article-meta.css";

export const markAsFavorite = async (article: ArticleData) => {
  const response = await axios.post(
    `${BASE_URL}articles/${article.slug}/favorite`,
    {},
    { headers: { authorization: getAuthToken() } }
  );
  const { favoritesCount } = response.data.article;
  article.favoritesCount = favoritesCount;
};

export const followUser = async (user: AuthorData) => {
  const response = await axios.post(
    `${BASE_URL}profiles/${user.username}/follow`,
    {},
    { headers: { authorization: getAuthToken() } }
  );
  user.following = true;
  return response.status;
};

export const unfollowUser = async (user: AuthorData) => {
  const response = await axios.delete(
    `${BASE_URL}profiles/${user.username}/follow`,
    { headers: { authorization: getAuthToken() } }
  );
  user.following = false;
  return response.status;
};

export const ArticleMeta = component$(
  (props: { article: ArticleData; authenticated?: boolean }) => {
    const state = useStore({ article: props.article }, { recursive: true });
    const { article } = state;
    return (
      <div class="article-meta">
        <a href="">
          <img
            src={article.author.imageUrl}
            alt={article.author.username}
          ></img>
        </a>
        <div>
          <div>
            <a class="author" href="">
              {" "}
              {article.author.username}
            </a>
          </div>
          <div>
            <span class="date">{formatDate(article.createdAt)}</span>
          </div>
        </div>
        {props.authenticated ? (
          article.author.following ? (
            <button
              class="btn btn-sm action-btn btn-outline-secondary"
              onClick$={() => unfollowUser(article.author)}
            >
              <i class="ion-minus-round"></i> &nbsp; Unfollow{" "}
              {article.author.username}
            </button>
          ) : (
            <button
              class="btn btn-sm action-btn btn-outline-secondary"
              onClick$={() => followUser(article.author)}
            >
              <i class="ion-plus-round"></i> &nbsp; Follow{" "}
              {article.author.username}
            </button>
          )
        ) : (
          <></>
        )}
        <button
          class="btn btn-sm btn-outline-primary"
          onClick$={() => markAsFavorite(article)}
        >
          <i class="ion-heart"></i> Favorite Article{" "}
          <span class="counter">({article.favoritesCount})</span>
        </button>
      </div>
    );
  }
);
