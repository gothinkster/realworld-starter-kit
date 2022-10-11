import { MultipleArticles, ArticlesFilters } from "~/types";

export const articles =
  (token?: string | null) =>
  async ({
    limit = 10,
    offset = 0,
  }: ArticlesFilters = {}): Promise<MultipleArticles> => {
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(
      `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`,
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
