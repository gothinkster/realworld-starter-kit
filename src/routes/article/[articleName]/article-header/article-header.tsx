import { component$ } from "@builder.io/qwik";
import { ArticleData } from "~/model/article-data";

import "./article-header.css";
import { ArticleMeta } from "../article-meta/article-meta";

export const ArticleHeader = component$(
  (props: { article: ArticleData; authenticated: boolean }) => {
    return (
      <div class="banner">
        <div class="container">
          <h1>{props.article.title}</h1>

          <ArticleMeta
            article={props.article}
            authenticated={props.authenticated}
          ></ArticleMeta>
        </div>
      </div>
    );
  }
);
