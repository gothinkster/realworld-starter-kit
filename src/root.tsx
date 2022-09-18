import { QwikCity, RouterOutlet } from "@builder.io/qwik-city";
import { Home } from "./routes/home/home";

import "./global.css";
import { Header } from "./components/header/header";

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
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        ></link>
        <link rel="stylesheet" href="//demo.productionready.io/main.css"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <QwikCity>
        <body>
          <Header></Header>
          <RouterOutlet />
        </body>
      </QwikCity>
    </html>
  );
};
