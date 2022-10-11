import { UpdateUser } from "~/types";

export const updateCurrentUser =
  (token: string) => async (user: UpdateUser) => {
    const body = JSON.stringify({ user });

    const authHeader = !!token && { authorization: `Token ${token}` };

    const head = await fetch("https://api.realworld.io/api/users", {
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
