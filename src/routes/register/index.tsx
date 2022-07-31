import { component$ } from "@builder.io/qwik";
import { DocumentHead, EndpointHandler } from "@builder.io/qwik-city";
import * as api from '~/libs/api';
import { getJwtString } from "~/libs/getJwt";

export const onPost: EndpointHandler = async ({ request, response }) => {
  const formData = await request.formData();
  const result = await api.post('users', {
		user: {
			email: formData.get('email'),
			username: formData.get('username'),
			password: formData.get('password')
		}
  });

  if (result.errors) {
    response.status = 401
		return { errors: result.errors };
	}

	const jwt = getJwtString(result.user)
  response.headers.set('Set-Cookie', `jwt=${jwt}; Path=/; HttpOnly`);
  response.redirect('/', 302);
};


export default component$(() => {
  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
              <a href="">Have an account?</a>
            </p>
            {/* TODO: get onPost error data */}
            {/* <ul class="error-messages">
              <li>That email is already taken</li>
            </ul> */}

            <form method="post">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  name="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  name="password"
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

export const head: DocumentHead = {
  title: "Sign up -- Conduit",
};
