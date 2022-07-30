import { component$, Host } from "@builder.io/qwik";

export default component$(
  () => {
    return (
      <Host>
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
      </Host>
    );
  },
  {
    tagName: "footer",
  }
);
