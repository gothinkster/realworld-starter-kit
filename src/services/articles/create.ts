import { Article } from "~/types";

export const createArticle =
  (token: string) =>
  async (article: Article): Promise<Article> => {
    const body = JSON.stringify({ article });
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(`https://api.realworld.io/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body,
    });

    const json = await head.json();

    return json;
  };
