import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { getCookies, getUser, saveTempCookie, UserData } from "~/auth/auth";
import { Header } from "../components/header/header";

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
export const onGet: RequestHandler<any> = async (args: RequestHandlerObj) => {
  const { request } = args;
  const cookiesObj = getCookies(request.headers.get("cookie"));
  const token = cookiesObj.token;
  saveTempCookie(token);
};

export const Layout = component$(async () => {
  const user: UserData = await getUser();
  return (
    <>
      <Header user={user} />
      <main>
        <Slot />
      </main>
    </>
  );
});

export default Layout;
