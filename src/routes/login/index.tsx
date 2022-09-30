import { useEndpoint, RequestHandler } from "@builder.io/qwik-city";
import { component$, useResource$, Resource, useStore } from "@builder.io/qwik";

type AuthUser = {
  token: string;
};

export const loginApi = async (
  { email, password }: any,
  controller?: AbortController
) => {
  const body = JSON.stringify({
    user: {
      email,
      password,
    },
  });

  const head = await fetch("https://api.realworld.io/api/users/login", {
    signal: controller?.signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const resp = await head.json();

  console.log({ head, resp });

  if (head.status === 200) {
    console.log("Usuário criado");
  } else {
    console.log("Não foi possivel criar usuário", { head });
  }

  return resp;
};

export default component$(() => {
  const user = useStore({
    email: "guilherme@gregio.net",
    password: "123",
    count: 0,
  });

  const loginResource = useResource$<string>(({ track, cleanup }) => {
    // We need a way to re-run fetching data whenever the `github.org` changes.
    // Use `track` to trigger re-running of this data fetching function.
    track(user, "count");

    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return loginApi(user, controller);
  });

  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              <pre>{JSON.stringify({ user }, null, 2)}</pre>
              <ul class="error-messages">
                <li>That email is already taken</li>
              </ul>

              <form method="POST">
                <fieldset class="form-group">
                  <input
                    name="email"
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={user.email}
                    onKeyUp$={(ev) =>
                      (user.email = (ev.target as HTMLInputElement).value)
                    }
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    name="password"
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onKeyUp$={(ev) =>
                      (user.password = (ev.target as HTMLInputElement).value)
                    }
                  />
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  onClick$={() => user.count++}
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Resource
        value={loginResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(authUser) => (
          <pre>{JSON.stringify({ authUser }, null, 2)}</pre>
        )}
      />
    </>
  );
});
