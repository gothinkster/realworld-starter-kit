import {
  $,
  component$,
  useClientEffect$,
  useOnDocument,
  useStore,
} from "@builder.io/qwik";
import axios from "axios";
import { getUser, logOut, updateUser, UserData } from "~/auth/auth";
import "~/global.css";
import "./index.css";

export const doLogOut = () => {
  logOut();
  window.location.href = "/";
};

export const submitUserData = async (evt: Event) => {
  console.log("evt", evt);
  const form = evt.target as HTMLElement;
  const user: Partial<UserData> & { password: string } = {
    image: (form.querySelector('[name="image"]') as HTMLInputElement)!.value,
    email: (form.querySelector('[name="email"]') as HTMLInputElement)!.value,
    username: (form.querySelector('[name="username"]') as HTMLInputElement)!
      .value,
    bio: (form.querySelector('[name="bio"]') as HTMLInputElement)!.value,
    password: (form.querySelector('[name="newPassword"]') as HTMLInputElement)!
      .value,
  };
  try {
    const response = await updateUser(user);
    if (response.status === 200) {
      window.location.href = "/";
    }
  } catch (err) {
    console.error(err);
  }

  evt.preventDefault();
  return false;
};

export default component$(async () => {
  useOnDocument(
    "load",
    $((evt: any) => {
      const form = document.querySelector("form");
      form.addEventListener("submit", submitUserData);
      console.log(form, form!.onsubmit);
      // submitUserData(evt))
    })
  );

  const user = await getUser();
  return (
    <>
      <div className="contianer">
        <h1>Your Settings</h1>
        <form method="post">
          <fieldset>
            <input
              name="image"
              placeholder="Image URL"
              value={user?.image}
            ></input>
            <input
              name="username"
              placeholder="username"
              value={user?.username}
            ></input>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={user?.email}
            ></input>

            <textarea name="bio" placeholder="Short BIO about you" rows={8}>
              {user?.bio}
            </textarea>
            <input
              name="newPassword"
              placeholder="New password"
              type="password"
            ></input>
            <button>Update settings</button>
          </fieldset>
        </form>
      </div>
      <hr />
      <div>
        <button class="btn btn-outline-danger" onClick$={() => doLogOut()}>
          Or click here to log out
        </button>
      </div>
    </>
  );
});
