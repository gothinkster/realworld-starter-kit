import { component$ } from "@builder.io/qwik";
import { SideMenu } from "../side-menu/side-menu";
import "./header.css";
export const Header = component$(() => {
  return (
    <div className="header-container">
      <div class="row">
        <div className="application-name-header">Qwik</div>
        <SideMenu></SideMenu>
      </div>
      <div className="banner">
        <h1>Qwik</h1>
        <p>A place to share your knowledge about Qwik</p>
      </div>
    </div>
  );
});
