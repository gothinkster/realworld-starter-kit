import { component$ } from "@builder.io/qwik";
import "./side-menu.css";

export const SideMenu = component$(() => {
  return (
    <div className="menu">
      <div className="menu-item">
        <a href="/">Home</a>
      </div>
      <div className="menu-item">
        <a href="/register">Sign up</a>
      </div>
      <div className="menu-item">
        <a>Log in</a>
      </div>
    </div>
  );
});
