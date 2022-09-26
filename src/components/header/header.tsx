import { component$ } from "@builder.io/qwik";
import { getUser, UserData } from "~/auth/auth";
import { SideMenu } from "../side-menu/side-menu";
import "./header.css";

export const Header = component$(async () => {
  const user = await getUser();
  return (
    <div className="header-container">
      <div class="row">
        <div className="application-name-header">Qwik</div>
        <SideMenu user={user}></SideMenu>
      </div>
    </div>
  );
});
