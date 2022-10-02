import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { getCookies, saveTempCookie } from "~/auth/auth";
import { Home } from "./home/home";

interface RequestHandlerObj {
  request: {
    headers: string[];
  };
  url: any;
  params: any;
  platform: any;
  next: () => void;
  abort: () => void;
}

export const onGet: RequestHandler = async (args) => {
  const { request } = args;
  const cookiesObj = getCookies(request.headers.get("cookie"));
  const token = cookiesObj.token;
  saveTempCookie(token);
};

export default component$(() => {
  return <Home></Home>;
});
