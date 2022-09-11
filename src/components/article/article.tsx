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
}

export const Article = component$((props: { article: ArticleData }) => {
  const { article } = props;
  return (
    <div class="article-container">
      <div>
        <img src={article.author.imageUrl} alt={article.author.username}></img>
      </div>
      <h2>{article.title}</h2>
      <div>{article.description}</div>
    </div>
  );
});
