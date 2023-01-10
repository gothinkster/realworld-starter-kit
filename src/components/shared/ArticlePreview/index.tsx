import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { Article } from "types";

interface Props {
  article: Article;
}

export const ArticlePreview = ({ article }: Props) => {
  return (
    <div className="article-preview" key={article.slug}>
      <div className="article-meta">
        <Link href={`/profile/${article.slug}`}>
          <img src={article.author?.image} />
        </Link>
        <div className="info">
          <Link href="" className="author">
            {article.author?.username}
          </Link>
          <span className="date">
            {dayjs(article.createdAt).format("MMMM D, YYYY")}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link href="" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
