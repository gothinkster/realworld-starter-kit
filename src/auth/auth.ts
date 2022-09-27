import axios from "axios";
import { BASE_URL } from "~/common/api";

declare const localStorage: any;
let tempToken = "";
export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
  setCookie("token", token);
};

export interface UserData {
  username: string;
  image: string;
}

export const getUser: () => UserData | Promise<UserData> = async () => {
  try {
    const response = await axios.get(`${BASE_URL}user`, {
      headers: {
        authorization: getAuthToken(),
      },
    });
    return response.data.user;
  } catch {
    return null;
  }
};

export const getCookies: (cookiesString?: string) => {
  [key: string]: string;
} = (cookiesString) => {
  if (cookiesString === undefined) {
    cookiesString = document.cookie;
  }
  const cookeisArray = cookiesString?.split(";") || [];
  const cookiesObj = cookeisArray.reduce((obj, item) => {
    const [key, value]: string[] = item.split("=");
    obj[key] = value;
    return obj;
  }, {});

  return cookiesObj;
};

export const getCookie = (key: string) => {
  const cookies = getCookies();
  return cookies[key];
};

export const setCookie = (key: string, value: string, responseObj?: any) => {
  try {
    document.cookie = `${key}=${value}`;
  } catch {
    // in case you a re on server side - do noting
    console.error("We are on server side", key, value);
  }
};

export const getAuthToken = () => {
  try {
    const token = tempToken || localStorage.getItem("token");
    return token ? `Token ${token}` : null;
  } catch (err) {
    // console.error('args', args, global);
    // In case localStorage is not defiend, i.e server side {
    return null;
  }
};
export const saveTempCookie = (token: string) => {
  tempToken = token;
  console.log("token", token);
  setCookie("token", token);
};
