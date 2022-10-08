import { component$ } from "@builder.io/qwik";
import axios from "axios";
import { getAuthToken } from "~/auth/auth";
import { BASE_URL } from "~/common/api";
import { ArticleData } from "~/model/article-data";
import "./favorite-article.css";
export const favoriteText = (article: ArticleData) => {
  return <>{article.favorited ? "Unfavorite Article" : "Favorite Article"} </>;
};

export const favoriteCount = (count: number, withBraces: boolean) => {
  return withBraces ? `(${count})` : count;
};

export const markAsFavorite = async (article: ArticleData) => {
  const response = await axios.post(
    `${BASE_URL}articles/${article.slug}/favorite`,
    {},
    { headers: { authorization: getAuthToken() } }
  );
  const { favoritesCount } = response.data.article;
  article.favoritesCount = favoritesCount;
};

export const FavoriteArtice = component$(
  (props: { article: ArticleData; showText?: boolean }) => {
    const { article, showText } = props;
    return (
      <button
        class="btn btn-sm btn-outline-primary"
        onClick$={() => markAsFavorite(article)}
      >
        <i class="ion-heart"></i>
        {showText ? <>{favoriteText(article)}</> : <></>}
        <span class="counter">
          {favoriteCount(article.favoritesCount, showText)}
        </span>
      </button>
    );
  }
);
