import { component$, Slot } from "@builder.io/qwik";
import { UserData } from "~/auth/auth";
import { Header } from "../components/header/header";

export const Layout = component$((props: { user: UserData }) => {
  return (
    <>
      <Header user={props.user} />
      <main>
        <Slot />
      </main>
    </>
  );
});

export default Layout;
