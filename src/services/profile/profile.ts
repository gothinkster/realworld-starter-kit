import { Profile } from "~/types";

export const profile =
  (token: string) =>
  async (username: Profile["username"]): Promise<Profile> => {
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(
      `https://api.realworld.io/api/profiles/${username}`,
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
