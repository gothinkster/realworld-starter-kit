import { component$, useClientEffect$ } from "@builder.io/qwik";
import "~/global.css";

export const submitUserData = (evt: any) => {
  const form = evt.target;
  const data = {
    email: form.querySelector("[name='email']")!.value,
    password: form.querySelector("[name='password']")!.value,
  };
  import("~/auth/auth")
    .then((auth) => {
      return auth.login(data);
    })
    .then(() => {
      window.location.href = "/";
    });
  evt.preventDefault();
  return false;
};

export default component$(() => {
  useClientEffect$(() => {
    setTimeout(() => {
      const form = document.querySelector("form");
      form!.addEventListener("submit", submitUserData);
    });
  });

  return (
    <>
      <div class="container">
        <h1>Sign in</h1>
        <form>
          <fieldset>
            <input placeholder="email" name="email"></input>
            <input
              placeholder="password"
              type="password"
              name="password"
            ></input>
          </fieldset>

          <button>Sign in</button>
        </form>
      </div>
    </>
  );
});
