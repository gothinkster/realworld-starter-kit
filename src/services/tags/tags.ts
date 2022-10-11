import { Tags } from "~/types";

export const tags = async (): Promise<Tags> => {
  const head = await fetch(`https://api.realworld.io/api/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await head.json();

  return json;
};
