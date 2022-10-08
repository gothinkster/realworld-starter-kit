import { Link, RequestHandler } from "@builder.io/qwik-city";
import { component$, Slot } from "@builder.io/qwik";
import { getToken, setTempToken, isAuthenticated } from "~/auth/auth";

type HasAuthenticated = {
  token: string;
  hasAuthenticated: boolean;
};

export const onGet: RequestHandler<HasAuthenticated> = async ({ request }) => {
  const token = getToken(request.headers.get("cookie"));

  setTempToken(token);
};

export default component$(() => {
  return (
    <>
      <main>
        <nav class="navbar navbar-light">
          <div class="container">
            <Link class="navbar-brand" href="/">
              conduit
            </Link>
            <ul class="nav navbar-nav pull-xs-right">
              <li class="nav-item">
                <Link class="nav-link active" href="/">
                  Home
                </Link>
              </li>
              {isAuthenticated() && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" href="/editor">
                      <i class="ion-compose"></i>&nbsp;New Article
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" href="/settings">
                      <i class="ion-gear-a"></i>&nbsp;Settings
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated() && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" href="/login">
                      Sign in
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" href="/register">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <div class="container">
          <a href="/" class="logo-font">
            conduit
          </a>
          <span class="attribution">
            An interactive learning project from{" "}
            <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
});
