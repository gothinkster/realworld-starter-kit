import { component$ } from "@builder.io/qwik";
import { UserData } from "~/auth/auth";
import "./side-menu.css";

export const SideMenu = component$((props: { user: UserData }) => {
  const { user } = props;
  return (
    <div className="menu">
      <div className="menu-item">
        <a href="/">Home</a>
      </div>

      {!user?.username ? (
        <>
          {" "}
          <div className="menu-item">
            <a href="/register">Sign up</a>
          </div>
          <div className="menu-item">
            <a href="/signin">Sign in</a>
          </div>
        </>
      ) : (
        <>
          <div class="menu-item">
            <a href="/settings" class="settings">
              <i class="ion-gear-a"></i>
              Settings
            </a>
          </div>
          <div className="menu-item">
            <a href="/editor" class="authenticated">
              <i class="ion-compose"></i> New Article
            </a>
          </div>
          <div class="menu-item">
            <a href={`/profile/${user.username}`}>
              <img src={user.image} />
              {user?.username}
            </a>
          </div>
        </>
      )}
    </div>
  );
});
