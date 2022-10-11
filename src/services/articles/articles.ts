import { MultipleArticles } from "~/types";

export const articles =
  (token: string) => async (): Promise<MultipleArticles> => {
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(`https://api.realworld.io/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    });

    const json = await head.json();

    return json;
  };
