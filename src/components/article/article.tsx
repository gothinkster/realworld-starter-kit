import { component$ } from "@builder.io/qwik";
import "./article.css";

export interface AuthorData {
  imageUrl: string;
  username: string;
}

export interface ArticleData {
  author: AuthorData;
  tagList: string[];
  title: string;
  description: string;
  createdAt: string;
  favoritesCount: number;
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("default", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const Article = component$((props: { article: ArticleData }) => {
  const { article } = props;
  const dateString = formatDate(article.createdAt);
  return (
    <div class="article-container">
      <div class="article-meta">
        <div class="article-info">
          <img
            src={article.author.imageUrl}
            alt={article.author.username}
          ></img>
          <div>
            <a class="author" href="">
              {" "}
              {article.author.username}
            </a>
            <span class="date">{dateString}</span>
          </div>
        </div>
        <button class="article-favorites">
          <i class="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <div class="article-title">{article.title}</div>
      <div class="description">{article.description}</div>
      <div class="read-more">Read mode...</div>
      <ul class="tags-list">
        {article.tagList.map((tag) => (
          <li class="tag-list-item">{tag}</li>
        ))}
      </ul>
    </div>
  );
});
