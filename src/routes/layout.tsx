import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main>
        <nav class="navbar navbar-light">
          <div class="container">
            <a class="navbar-brand" href="index.html">
              conduit
            </a>
            <ul class="nav navbar-nav pull-xs-right">
              <li class="nav-item">
                <a class="nav-link active" href="">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">
                  <i class="ion-compose"></i>&nbsp;New Article
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">
                  <i class="ion-gear-a"></i>&nbsp;Settings
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">
                  Sign in
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">
                  Sign up
                </a>
              </li>
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
