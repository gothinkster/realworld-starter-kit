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
      <div className="article-meta">
        <img src={article.author.imageUrl} alt={article.author.username}></img>
        <div className="article-info">
          <a className="author" href="">
            {" "}
            {article.author.username}
          </a>

          <span className="date">{dateString}</span>
        </div>
      </div>
      <div className="article-title">{article.title}</div>
      <div className="description">{article.description}</div>
    </div>
  );
});
