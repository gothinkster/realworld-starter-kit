import { component$ } from "@builder.io/qwik";
import { formatDate } from "~/common/date-utils";
import { ArticleData } from "~/model/article-data";

import "./article-header.css";
import { ArticleMeta } from "../article-meta/article-meta";

export const ArticleHeader = component$((article: ArticleData) => {
  return (
    <div class="banner">
      <div class="container">
        <h1>{article.title}</h1>

        <ArticleMeta article={article}></ArticleMeta>
      </div>
    </div>
  );
});
