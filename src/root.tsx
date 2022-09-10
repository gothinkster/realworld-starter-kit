import { App } from "./components/app/app";

import "./global.css";

export default () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Realworld App</title>
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        ></link>
        <link rel="stylesheet" href="//demo.productionready.io/main.css"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <App />
      </body>
    </html>
  );
};
