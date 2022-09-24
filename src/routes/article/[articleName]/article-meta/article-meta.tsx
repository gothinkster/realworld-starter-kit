import { component$ } from "@builder.io/qwik";
import { formatDate } from "~/common/date-utils";
import { ArticleData } from "~/model/article-data";
import "./article-meta.css";

export const ArticleMeta = component$((props: { article: ArticleData }) => {
  const { article } = props;
  return (
    <div class="article-meta">
      <a href="">
        <img src={article.author.imageUrl} alt={article.author.username}></img>
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
      <button class="btn btn-sm action-btn btn-outline-secondary">
        <i class="ion-plus-round"></i> &nbsp; Follow {article.author.username}
      </button>
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i> Favorite Article{" "}
        <span class="counter">({article.favoritesCount})</span>
      </button>
    </div>
  );
});
