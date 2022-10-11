import { Article, MultipleArticles } from "~/types";

export const createArticleComment =
  (token: string) =>
  (slug: Article["slug"]) =>
  (comment: string) =>
  async (): Promise<MultipleArticles> => {
    const body = JSON.stringify({ comment });
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(
      `https://api.realworld.io/api/articles/${slug}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body,
      }
    );

    const json = await head.json();

    return json;
  };
