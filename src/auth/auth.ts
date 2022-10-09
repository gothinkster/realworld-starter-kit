let tempToken: string | null;

const AUTH_TOKEN_NAME = "realworld-qwik";

export const setTempToken = (token: string | null) => {
  tempToken = token;
};

export const getTempToken = () => {
  return tempToken;
};

export const isAuthenticated = () => {
  return !!getTempToken();
};

export const getToken = (cookie: string | null): string | null => {
  if (!cookie) {
    return null;
  }
  return (
    cookie
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {} as Record<string, string>)[AUTH_TOKEN_NAME] || null
  );
};

export const createToken = (token: string) => {
  return `${AUTH_TOKEN_NAME}=${token}; Secure; HttpOnly; Max-Age=${60 * 5}`;
};

export const removeToken = () => {
  return `${AUTH_TOKEN_NAME}=; Secure; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
