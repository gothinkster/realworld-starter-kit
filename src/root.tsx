import { Html } from "@builder.io/qwik-city";
import { Head } from "./components/head/head";
import { Content } from "@builder.io/qwik-city";

export default () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Content />
      </body>
    </Html>
  );
};
