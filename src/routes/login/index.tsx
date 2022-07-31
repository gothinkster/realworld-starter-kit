import { component$ } from "@builder.io/qwik";
import { DocumentHead, EndpointHandler } from "@builder.io/qwik-city";
import { getSession } from "~/libs/getSession";
import * as api from '~/libs/api';
import { getJwtString } from "~/libs/getJwt";

export const onGet: EndpointHandler = async ({ request, response }) => {
  const { user } = getSession(request.headers.get('cookie'))
  const isAuthenticated = !!user
  if (isAuthenticated) {
    response.redirect('/', 302);
  }
};

export const onPost: EndpointHandler = async ({ request, response }) => {
  const formData = await request.formData();
  const result = await api.post('users/login', {
		user: {
			email: formData.get('email'),
			password: formData.get('password')
		}
  });

  if (result.errors) {
    response.status = 401
		return { errors: result.errors };
	}

	const jwt = getJwtString(result.user)
  response.headers.set('Set-Cookie', `jwt=${jwt}; Path=/; HttpOnly`);
  // FIXME: tried response.redirect('/', 200), not work
  response.redirect('/', 302);
};

export default component$(() => {
  // TODO: how to consume `onPost` error data ?
  // <Resource resource={postResource} /> will render in `GET` method as well ?
  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <form method="post">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign in -- Conduit",
};
