import { Article } from "~/types";

export const updateArticle =
  (token: string) =>
  (slug: Article["slug"]) =>
  async (article: Article): Promise<Article> => {
    const body = JSON.stringify({ article });
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(`https://api.realworld.io/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body,
    });

    const json = await head.json();

    return json;
  };
