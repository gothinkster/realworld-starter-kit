import { component$, Resource, $ } from "@builder.io/qwik";
import { DocumentHead, EndpointHandler, useEndpoint } from "@builder.io/qwik-city";
import { components } from "~/libs/api-schema";
import * as api from "~/libs/api"
import { getSession } from "~/libs/getSession";
import { post } from "~/libs/ajax";

export interface EndpointData {
  user: components["schemas"]["User"]
}

export const onGet: EndpointHandler<EndpointData> = async ({
  request, response
}) => {
  const { user } = getSession(request.headers.get("cookie"))
  if (!user) {
    response.redirect('/login', 302);
    return
  }
  return {
    user,
  }
}

export const onPost: EndpointHandler = async ({ request, response }) => {
  const { user } = getSession(request.headers.get("cookie"))
  if (!user) {
    response.redirect('/login', 302);
    return
  }
  const formData = await request.formData();
  const result = await api.put('user', {
		user: {
			email: formData.get('email'),
      // TODO: the api seems mess up bio with image fields, strange.
			bio: formData.get('bio'),
			image: formData.get('image'),
			username: formData.get('username'),
      // I didn't see password field in swagger docs, comment out for now
			// password: formData.get('password')
		}
  }, user.token);

  if (result.errors) {
    response.status = 401
		return { errors: result.errors };
	}

	const newUser = JSON.stringify(result.user);
	const jwt = Buffer.from(newUser).toString('base64');
  response.headers.set('Set-Cookie', `jwt=${jwt}; Path=/; HttpOnly`);
  response.redirect(`/profile/@${result.user.username}`, 302);
};


export default component$(() => {
  const resource = useEndpoint<typeof onGet>()

	const logout = $(() => {
    post('api/logout')
      .then(() => {
        location.href = '/'
      })
	})

  return (
    <Resource resource={resource} onResolved={
      ({ user }) => {
        return (
          <div class="settings-page">
            <div class="container page">
              <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                  <h1 class="text-xs-center">Your Settings</h1>

                  <form method="post">
                    <fieldset>
                      <fieldset class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          value={user.image || ''}
                          name="image"
                          placeholder="URL of profile picture"
                        />
                      </fieldset>
                      <fieldset class="form-group">
                        <input
                          class="form-control form-control-lg"
                          type="text"
                          name="username"
                          value={user.username || ''}
                          placeholder="Your Name"
                        />
                      </fieldset>
                      <fieldset class="form-group">
                        <textarea
                          class="form-control form-control-lg"
                          rows={8}
                          name="bio"
                          value={user.bio || ''}
                          placeholder="Short bio about you"
                        ></textarea>
                      </fieldset>
                      <fieldset class="form-group">
                        <input
                          class="form-control form-control-lg"
                          value={user.email || ''}
                          type="text"
                          name="email"
                          placeholder="Email"
                        />
                      </fieldset>
                      {/* I didn't see password field in swagger docs, comment out for now */}
                      {/* <fieldset class="form-group">
                        <input
                          class="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </fieldset> */}
                      <button class="btn btn-lg btn-primary pull-xs-right">
                        Update Settings
                      </button>
                    </fieldset>
                  </form>

                  <hr />

                  <button class="btn btn-outline-danger" onClick$={logout}> Or click here to logout. </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    } />
  );
});

export const head: DocumentHead = {
  title: "Settings -- Conduit",
};
