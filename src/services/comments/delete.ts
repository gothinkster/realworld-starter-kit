import { Article, MultipleArticles } from "~/types";

export const removeArticleComment =
  (token: string) =>
  (slug: Article["slug"]) =>
  (id: number) =>
  async (): Promise<MultipleArticles> => {
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(
      `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
      }
    );

    const json = await head.json();

    return json;
  };
