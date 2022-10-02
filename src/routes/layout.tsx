import { component$, Slot } from "@builder.io/qwik";
import { getUser, UserData } from "~/auth/auth";
import { Header } from "../components/header/header";

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
