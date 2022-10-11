import { Article, MultipleArticles } from "~/types";

export const articleComments =
  (token: string) =>
  (slug: Article["slug"]) =>
  async (): Promise<MultipleArticles> => {
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(
      `https://api.realworld.io/api/articles/${slug}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
      }
    );

    const json = await head.json();

    return json;
  };
