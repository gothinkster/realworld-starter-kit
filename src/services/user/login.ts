import { LoginUser } from "~/types";

export const login = async (user: LoginUser) => {
  const body = JSON.stringify({ user });

  const head = await fetch("https://api.realworld.io/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const json = await head.json();

  return json;
};
