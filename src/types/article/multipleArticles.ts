import { Article } from "./article";

export type MultipleArticles = {
  articles: Article[];
  articlesCount: number;
};

export type ArticlesFilters = {
  limit?: number;
  offset?: number;
};
