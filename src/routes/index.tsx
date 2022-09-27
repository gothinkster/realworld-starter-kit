import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { getCookies, saveTempCookie } from "~/auth/auth";
import { Home } from "./home/home";

export const onGet: RequestHandler = async (req: any) => {
  const cookiesObj = getCookies(req.request.headers.get("cookie"));
  const token = cookiesObj["token"];
  saveTempCookie(token);
};

export default component$(() => {
  return <Home></Home>;
});
