import { component$, mutable } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { ArticleData } from "~/model/article-data";
import { ArticleMeta } from "~/routes/article/[articleName]/article-meta/article-meta";
import { ArticleTagsList } from "../article-tags-list/article-tags-list";
import "./article.css";

export const Article = component$(
  (props: { article: ArticleData; authenticated: boolean }) => {
    const { article, authenticated } = props;
    return (
      <div>
        <div class="article-container">
          <ArticleMeta
            article={mutable(article)}
            authenticated={mutable(authenticated)}
          ></ArticleMeta>
          <div class="article-title">
            <a href={`/article/${article.slug}`}> {article.title}</a>
          </div>
          <div class="description">{article.description}</div>
          <div class="read-more">Read mode...</div>
          <ArticleTagsList
            tagsList={mutable(article.tagList)}
          ></ArticleTagsList>
        </div>
      </div>
    );
  }
);
