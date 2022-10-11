import { MultipleArticles } from "~/types";

export const feed = (token: string | null) => async (): Promise<MultipleArticles> => {
  const authHeader = !!token && { authorization: `Token ${token}` };

  const head = await fetch(`https://api.realworld.io/api/articles/feed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
  });

  const json = await head.json();

  return json;
};
