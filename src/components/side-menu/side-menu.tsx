import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { getUser, UserData } from "~/auth/auth";
import "./side-menu.css";

export const SideMenu = component$((props: { user: UserData }) => {
  return (
    <div className="menu">
      <div className="menu-item">
        <a href="/">Home</a>
      </div>

      <div className="menu-item">
        <a href="/register">{props.user?.username || "Sign up"}</a>
      </div>
      <div className="menu-item">
        <a>Log in</a>
      </div>
    </div>
  );
});
