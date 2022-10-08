import { component$, mutable } from "@builder.io/qwik";
import { formatDate } from "~/common/date-utils";
import { ArticleData } from "~/model/article-data";
import "~/global.css";
import "./article-meta.css";
import { FollowUser } from "~/components/follow-user/follow-user";
import { FavoriteArtice } from "~/components/favorite-article/favorite-article";

export const ArticleMeta = component$(
  (props: {
    article: ArticleData;
    authenticated?: boolean;
    showFollowUser?: boolean;
    showFavoriteText?: boolean;
  }) => {
    const { article, showFavoriteText } = props;
    console.log("article", article);
    return (
      <div class="article-meta">
        <a href={`/profile/${article.author.username}`}>
          <img
            src={article.author.imageUrl || article.author.image}
            alt={article.author.username}
          ></img>
        </a>
        <div>
          <div>
            <a class="author" href={`/profile/${article.author.username}`}>
              {" "}
              {article.author.username}
            </a>
          </div>
          <div>
            <span class="date">{formatDate(article.createdAt)}</span>
          </div>
        </div>
        {props.authenticated ? (
          <>
            {props.showFollowUser ? (
              <FollowUser
                user={mutable(article.author)}
                following={mutable(article.author.following)}
              ></FollowUser>
            ) : (
              <></>
            )}
            <FavoriteArtice
              article={mutable(article)}
              showText={showFavoriteText}
            ></FavoriteArtice>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
