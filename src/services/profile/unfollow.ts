import { Profile } from "~/types";

export const unfollow =
  (token: string) =>
  async (username: Profile["username"]): Promise<Profile> => {
    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch(
      `https://api.realworld.io/api/profiles/${username}/follow`,
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
