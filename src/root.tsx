import {
  QwikCity,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";

import "./global.css";
import { RouterHead } from "./components/RouterHead/RouterHead";

export default () => {
  // return (<>
  //     <QwikCity>
  //     <head>
  //       <meta charSet="utf-8" />
  //       <RouterHead></RouterHead>
  //     </head>
  //     <body>
  //       <Header></Header>
  //       <RouterOutlet></RouterOutlet>
  //       <ServiceWorkerRegister />

  //      </body>
  //     </QwikCity>
  //   </>
  // );
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
};
