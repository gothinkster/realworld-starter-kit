import { useEndpoint, RequestHandler } from "@builder.io/qwik-city";
import { component$, Resource } from "@builder.io/qwik";

type AuthUser = {
  token: string;
};

export const onPost: RequestHandler<AuthUser> = async ({
  url,
  params,
  request,
  response,
}) => {
  const formValues = await request.formData();

  const body = JSON.stringify({
    user: {
      email: formValues.get("email"),
      password: formValues.get("password"),
    },
  });

  const head = await fetch("https://api.realworld.io/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const resp = await head.json();

  console.log({ head, resp });
  if (head.status === 200) {
    response.headers.append(
      "Set-Cookie",
      `realworld-qwik=${resp.user.token}; path=/`
    );
    throw response.redirect("/", 302);
  } else {
    console.log("Não foi possivel criar usuário", { head });
  }

  return resp;
};

export default component$(() => {
  const data = useEndpoint<AuthUser>();

  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <Resource
              value={data}
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(data: any) => (
                <ul class="error-messages">
                  {Object.keys(data.errors).map(key => (
                    <li>That {key} {data.errors[key]}</li>
                  ))}
                </ul>
              )}
            />
            <form method="POST">
              <fieldset class="form-group">
                <input
                  name="email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  name="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
