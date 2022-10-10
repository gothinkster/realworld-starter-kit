export type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export const register = async (user: RegisterUser) => {
  const body = JSON.stringify({ user });

  const head = await fetch("https://api.realworld.io/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const json = await head.json();

  return json;
};
